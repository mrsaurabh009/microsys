        (function () {
            'use strict';

            const postContainer = document.getElementById('post-container');
            const urlParams = new URLSearchParams(window.location.search);
            const isPrerendered = document.body.hasAttribute('data-prerendered-slug') || (postContainer && !postContainer.querySelector('.loading-state') && postContainer.children.length > 0);
            const slug = isPrerendered ? (document.body.getAttribute('data-prerendered-slug') || urlParams.get('slug')) : (urlParams.get('slug') || urlParams.get('file'));

            function formatDate(dateStr) {
                if (!dateStr) return '';
                const cleanDate = dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00';
                const date = new Date(cleanDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', options);
            }

            function updateMetaTags(postMeta) {
                // Update page title
                document.title = (postMeta.title ? postMeta.title : 'Article') + ' | Microsys Computer & Accessories';

                // Update or create meta description
                const desc = postMeta.meta_description || postMeta.excerpt || '';
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.setAttribute('name', 'description');
                    document.head.appendChild(metaDesc);
                }
                metaDesc.setAttribute('content', desc);

                // Open Graph Overrides
                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle) ogTitle.setAttribute('content', postMeta.title);
                
                const ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc) ogDesc.setAttribute('content', desc);
                
                const currentUrl = window.location.href;
                const ogUrl = document.querySelector('meta[property="og:url"]');
                if (ogUrl) ogUrl.setAttribute('content', currentUrl);
                
                const rawThumb = postMeta.thumbnail_url || postMeta.thumbnail || '';
                let thumbUrl = '';
                if (rawThumb) {
                    if (rawThumb.startsWith('http')) {
                        thumbUrl = rawThumb;
                    } else {
                        const relPath = rawThumb.startsWith('blogs/') ? rawThumb : 'blogs/' + rawThumb.replace(/^\.?\//, '');
                        thumbUrl = new URL(relPath, window.location.origin).href;
                    }
                }

                const ogImage = document.querySelector('meta[property="og:image"]');
                if (ogImage && thumbUrl) ogImage.setAttribute('content', thumbUrl);
                
                const ogType = document.querySelector('meta[property="og:type"]');
                if (ogType) ogType.setAttribute('content', 'article');

                // Twitter Overrides
                const twTitle = document.querySelector('meta[name="twitter:title"]');
                if (twTitle) twTitle.setAttribute('content', postMeta.title);

                const twDesc = document.querySelector('meta[name="twitter:description"]');
                if (twDesc) twDesc.setAttribute('content', desc);

                const twImage = document.querySelector('meta[name="twitter:image"]');
                if (twImage && thumbUrl) twImage.setAttribute('content', thumbUrl);
                
                const twCard = document.querySelector('meta[name="twitter:card"]');
                if (twCard) twCard.setAttribute('content', 'summary_large_image');

                // Canonical URL
                let canonical = document.querySelector('link[rel="canonical"]');
                if (!canonical) {
                    canonical = document.createElement('link');
                    canonical.setAttribute('rel', 'canonical');
                    document.head.appendChild(canonical);
                }
                canonical.setAttribute('href', currentUrl);

                // JSON-LD
                let jsonLd = document.querySelector('script[type="application/ld+json"]');
                if (!jsonLd) {
                    jsonLd = document.createElement('script');
                    jsonLd.setAttribute('type', 'application/ld+json');
                    document.head.appendChild(jsonLd);
                }
                const structuredData = {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": postMeta.title,
                    "description": desc,
                    "image": thumbUrl || "https://microsys.com/assets/microsys-logo.svg",
                    "author": {
                        "@type": "Person",
                        "name": postMeta.author_name || postMeta.author || "Microsys Team"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Microsys Computer & Accessories",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://microsys.com/assets/microsys-logo.svg"
                        }
                    },
                    "datePublished": postMeta.published_date || postMeta.date,
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": currentUrl
                    }
                };
                jsonLd.textContent = JSON.stringify(structuredData);
            }

            function renderSidebarRelatedPosts(currentPost, allPosts) {
                const listContainer = document.querySelector('.sidebar-related-list');
                if (!listContainer || !allPosts || allPosts.length === 0) return;

                // Filter published posts excluding the current one
                const available = allPosts.filter(function (p) {
                    return p.slug !== currentPost.slug && (p.status ? p.status === 'published' : true);
                });

                if (available.length === 0) {
                    listContainer.innerHTML = '<p style="color:var(--color-text-muted); font-size:0.88rem; padding:var(--space-s) 0;">No other articles available.</p>';
                    return;
                }

                // Prioritize same category, then other published posts
                const currentCat = currentPost.category || '';
                let matches = available.filter(function (p) { return p.category === currentCat; });
                let others = available.filter(function (p) { return p.category !== currentCat; });

                let related = matches.concat(others).slice(0, 3);

                let html = '';
                related.forEach(function (post) {
                    const rawThumb = post.thumbnail_url || post.thumbnail || '';
                    let finalThumb = rawThumb;
                    if (finalThumb && !finalThumb.startsWith('http') && !finalThumb.startsWith('blogs/') && !finalThumb.startsWith('data:')) {
                        finalThumb = 'blogs/' + finalThumb.replace(/^\.?\//, '');
                    }
                    if (!finalThumb) {
                        finalThumb = 'assets/categoryimage/gaming.webp';
                    }

                    const cat = post.category || 'Article';
                    const url = 'blog-detail.html?slug=' + encodeURIComponent(post.slug);

                    html += '<a href="' + url + '" class="sidebar-related-card">' +
                        '<div class="sidebar-related-thumb">' +
                        '<img src="' + finalThumb + '" alt="' + (post.title || '').replace(/"/g, '&quot;') + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                        '</div>' +
                        '<div class="sidebar-related-info">' +
                        '<span class="sidebar-related-tag">' + cat + '</span>' +
                        '<h4 class="sidebar-related-title">' + post.title + '</h4>' +
                        '</div>' +
                        '</a>';
                });

                listContainer.innerHTML = html;
            }

            function renderPost(postMeta, htmlContent, allPostsData) {
                // Update SEO tags
                if (!isPrerendered) updateMetaTags(postMeta);

                let views = 0;
                try {
                    const viewsKey = 'views_' + postMeta.slug;
                    views = parseInt(localStorage.getItem(viewsKey) || '0', 10) + 1;
                    localStorage.setItem(viewsKey, views);
                } catch (e) {
                    // Fail silently
                }
                const viewsText = views > 0 ? '<span class="separator view-count-rendered">·</span><span class="view-count-rendered">' + views + (views === 1 ? ' view' : ' views') + '</span>' : '';

                const rawThumb = postMeta.thumbnail_url || postMeta.thumbnail || '';
                let finalThumb = rawThumb;
                if (finalThumb && !finalThumb.startsWith('http') && !finalThumb.startsWith('blogs/') && !finalThumb.startsWith('data:')) {
                    finalThumb = 'blogs/' + finalThumb.replace(/^\.?\//, '');
                }

                const thumbnailHTML = finalThumb
                    ? '<img src="' + finalThumb + '" alt="' + postMeta.title +
                    '" class="post-hero-image" onerror="this.style.display=\'none\'">'
                    : '';

                if (!isPrerendered) {
                    postContainer.innerHTML =
                        thumbnailHTML +
                        '<div class="post-meta">' +
                        (postMeta.category ? '<a href="blog.html?cat=' + encodeURIComponent(postMeta.category) + '" class="category-tag">' + postMeta.category + '</a><br>' : '') +
                        '<span>' + formatDate(postMeta.published_date || postMeta.date) + '</span>' +
                        '<span class="separator">·</span>' +
                        '<span>By ' + (postMeta.author_name || postMeta.author || 'Microsys Team') + '</span>' +
                        viewsText +
                        '</div>' +
                        '<h1 class="post-page-title">' + postMeta.title + '</h1>' +
                        '<div class="post-content">' + htmlContent + '</div>' +
                        '<div class="share-bar">' +
                        '<span class="share-label">Share this article:</span>' +
                        '<div class="share-buttons">' +
                        '<button class="share-btn share-wa" aria-label="Share on WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></button>' +
                        '<button class="share-btn share-reddit" aria-label="Share on Reddit" title="Reddit"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 11.5c0-.94.76-1.7 1.7-1.7.6 0 1.16.32 1.46.82C3.86 11.36 2.65 12.56 2.06 14.1c-.5-.5-.86-1.12-.86-1.8zm18 7c-2.3 2.1-6.15 2.1-8.3 2.1-2.15 0-6-.02-8.3-2.1-1.32-1.28-1.7-2.9-1.7-3.9 0-1.64 1.34-3.16 3.8-3.8.3-.08.5-.4.4-.7-.04-.17-.06-.34-.06-.5 0-2.43 3.03-4.4 6.8-4.4 3.76 0 6.8 1.97 6.8 4.4 0 .16-.02.33-.06.5-.02.3.18.62.48.7 2.46.64 3.8 2.16 3.8 3.8 0 1-3.9 2.62-5.22 3.9zm3.64-4.4c-.6-1.54-1.8-2.74-3.4-3.48.3-.5.86-.82 1.46-.82.94 0 1.7.76 1.7 1.7 0 .68-.36 1.3-.86 1.8z"/><path d="M16 14.7c-1.4 1.4-4 1.4-4 1.4s-2.6 0-4-1.4c-.26-.26-.7-.26-.96 0-.27.27-.27.7 0 .97 1.7 1.7 4.96 1.7 4.96 1.7s3.25 0 4.95-1.7c.26-.26.26-.7 0-.96-.25-.26-.7-.26-.95 0zM8.38 10.32c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM15.62 10.32c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button>' +
                        '<button class="share-btn share-in" aria-label="Share on LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></button>' +
                        '<button class="share-btn share-copy" aria-label="Copy URL" title="Copy URL"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg><span class="copy-text">Copy</span></button>' +
                        '</div>' +
                        '<div class="share-toast" aria-live="polite"></div>' +
                        '</div>';
                } else {
                    const metaDiv = postContainer.querySelector('.post-meta');
                    if (metaDiv && views > 0 && !metaDiv.querySelector('.view-count-rendered')) {
                        metaDiv.insertAdjacentHTML('beforeend', viewsText);
                    }
                }

                /* [REMOVED] Bottom Related Posts generation — replaced by right sidebar related articles widget
                if (!isPrerendered) {
                    // Generate Related Posts
                    const currentCategory = postMeta.category || '';
                    const currentSlug = postMeta.slug;
                    
                    let availablePosts = allPostsData
                        .filter(function(p) { return p.slug !== currentSlug; })
                        .sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
                    
                    let sameCategory = availablePosts.filter(function(p) { return p.category === currentCategory; });
                    let differentCategory = availablePosts.filter(function(p) { return p.category !== currentCategory; });
                    
                    let relatedPosts = [];
                    relatedPosts = relatedPosts.concat(sameCategory.slice(0, 2));
                    
                    if (differentCategory.length > 0) {
                        relatedPosts.push(differentCategory[0]);
                    }
                    
                    if (relatedPosts.length < 3) {
                        const alreadyIncluded = relatedPosts.map(function(p) { return p.slug; });
                        const remaining = availablePosts.filter(function(p) { return !alreadyIncluded.includes(p.slug); });
                        const needed = 3 - relatedPosts.length;
                        relatedPosts = relatedPosts.concat(remaining.slice(0, needed));
                    }
                    
                    if (relatedPosts.length > 0) {
                        let relatedHTML = '<div class="related-posts-section"><h2 class="related-posts-title">Related Posts</h2><div class="related-posts-grid">';
                        relatedPosts.forEach(function(post) {
                            const thumb = post.thumbnail 
                                ? '<img src="' + post.thumbnail + '" alt="' + post.title + '" class="related-card-img" onerror="this.style.display=\'none\'">'
                                : '<div class="related-card-fallback"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>';
                            const catTag = post.category ? '<span class="related-card-cat">' + post.category + '</span>' : '';
                            
                            relatedHTML += '<a href="post.html?file=' + post.slug + '" class="related-card">' +
                                '<div class="related-card-img-wrapper">' + thumb + catTag + '</div>' +
                                '<div class="related-card-content"><h3 class="related-card-title">' + post.title + '</h3></div>' +
                                '</a>';
                        });
                        relatedHTML += '</div></div>';
                        postContainer.innerHTML += relatedHTML;
                    }
                }
                */

                // Setup share functionality
                const currentUrl = encodeURIComponent(window.location.href);
                const currentTitle = encodeURIComponent(postMeta.title);
                
                const shareWa = postContainer.querySelector('.share-wa');
                if (shareWa) shareWa.addEventListener('click', () => window.open('https://api.whatsapp.com/send?text=' + currentTitle + ' ' + currentUrl, '_blank'));
                
                const shareReddit = postContainer.querySelector('.share-reddit');
                if (shareReddit) shareReddit.addEventListener('click', () => window.open('https://reddit.com/submit?url=' + currentUrl + '&title=' + currentTitle, '_blank'));
                
                const shareIn = postContainer.querySelector('.share-in');
                if (shareIn) shareIn.addEventListener('click', () => window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + currentUrl + '&title=' + currentTitle, '_blank'));
                
                const shareCopy = postContainer.querySelector('.share-copy');
                const shareToast = postContainer.querySelector('.share-toast');
                if (shareCopy && shareToast) {
                    shareCopy.addEventListener('click', () => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            shareToast.textContent = 'Link copied to clipboard!';
                            shareToast.classList.add('show-toast');
                            setTimeout(() => shareToast.classList.remove('show-toast'), 2500);
                        }).catch(() => {
                            shareToast.textContent = 'Failed to copy!';
                            shareToast.classList.add('show-toast');
                            setTimeout(() => shareToast.classList.remove('show-toast'), 2500);
                        });
                    });
                }

                // Process Mermaid diagrams
                const mermaidBlocks = postContainer.querySelectorAll('pre code.language-mermaid');
                if (mermaidBlocks.length > 0) {
                    mermaidBlocks.forEach(function (codeEl) {
                        const preEl = codeEl.parentElement;
                        const mermaidDiv = document.createElement('div');
                        mermaidDiv.className = 'mermaid';
                        mermaidDiv.textContent = codeEl.textContent;
                        preEl.parentNode.replaceChild(mermaidDiv, preEl);
                    });
                    
                    if (window.mermaid) {
                        mermaid.initialize({ startOnLoad: false, theme: 'default' });
                        mermaid.init(undefined, postContainer.querySelectorAll('.mermaid'));
                    }
                }

                // Wrap tables for responsiveness
                postContainer.querySelectorAll('table').forEach(function (table) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-wrapper';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                });

                // Style FAQs and Next Step
                const headers = postContainer.querySelectorAll('h2, h3');
                headers.forEach(function (h) {
                    const text = h.textContent.toLowerCase();
                    if (text.includes('faq')) {
                        let sibling = h.nextElementSibling;
                        while (sibling && !['H1','H2','H3','H4','H5','H6'].includes(sibling.tagName)) {
                            if (sibling.tagName === 'P') {
                                const firstChild = sibling.firstElementChild;
                                if (firstChild && firstChild.tagName === 'STRONG') {
                                    firstChild.classList.add('faq-question');
                                }
                            }
                            sibling = sibling.nextElementSibling;
                        }
                    } else if (text.includes('next step')) {
                        h.classList.add('next-step-heading');
                        let sibling = h.nextElementSibling;
                        while (sibling && !['H1','H2','H3','H4','H5','H6'].includes(sibling.tagName)) {
                            sibling.classList.add('next-step-content');
                            sibling = sibling.nextElementSibling;
                        }
                    }
                });

                // Populate right sidebar Related Articles
                renderSidebarRelatedPosts(postMeta, allPostsData);

                // Sync comment form target blog_id
                const blogIdInput = document.getElementById('comment-blog-id') || document.querySelector('input[name="blog_id"]');
                if (blogIdInput && postMeta.id) {
                    blogIdInput.value = postMeta.id;
                }

                // Initialize progress bar
                setTimeout(updateProgressBar, 100);
            }

            // Comment form prototype submit handling
            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.addEventListener('submit', function(e) {
                    if (window.location.protocol === 'file:' || !window.location.pathname.endsWith('.php')) {
                        e.preventDefault();
                        const submitBtn = commentForm.querySelector('.comment-submit-btn');
                        const originalText = submitBtn ? submitBtn.textContent : 'Post Comment';
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Submitting…';
                        }
                        setTimeout(function() {
                            alert('Thank you! Your comment has been submitted and is pending administrator approval.');
                            commentForm.reset();
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = originalText;
                            }
                        }, 500);
                    }
                });
            }

            function updateProgressBar() {
                const progressBar = document.getElementById('reading-progress');
                const article = document.getElementById('post-container');
                if (!progressBar || !article) return;
                
                const rect = article.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const articleBottom = rect.bottom + window.scrollY;
                const scrollEnd = articleBottom - windowHeight;
                
                let progress = 0;
                if (scrollEnd <= 0) {
                    progress = 1;
                } else {
                    progress = window.scrollY / scrollEnd;
                }
                
                progress = Math.min(1, Math.max(0, progress));
                progressBar.style.transform = 'scaleX(' + progress + ')';
            }

            window.addEventListener('scroll', updateProgressBar, { passive: true });
            window.addEventListener('resize', updateProgressBar, { passive: true });

            function showError(message) {
                document.title = 'Article Not Found — Microsys';
                postContainer.innerHTML =
                    '<div class="error-state">⚠️ ' + message + '</div>';
            }

            if (!slug) {
                if (isPrerendered) {
                    console.warn('No slug found in pre-rendered post.');
                } else {
                    showError('No article specified. <a href="blog.html" style="color:var(--color-primary);text-decoration:underline;">Please select an article to read.</a>');
                }
            } else {
                window.VYOMARC_FETCH_ONLY = true;
                const loadManifest = function() {
                    return new Promise(function(resolve, reject) {
                        if (window.vyomarcFetchManifest) {
                            return resolve(window.vyomarcFetchManifest());
                        }

                        try {
                            const cached = sessionStorage.getItem('microsys_manifest_v2');
                            const timestamp = sessionStorage.getItem('microsys_manifest_v2_time');
                            if (cached && timestamp && (Date.now() - parseInt(timestamp, 10) < 300000)) {
                                return resolve(JSON.parse(cached));
                            }
                        } catch (e) {}

                        fetch('blogs/posts.json')
                            .then(function(r) {
                                if (!r.ok) return fetch('./posts.json');
                                return r;
                            })
                            .then(function(r) {
                                if (!r.ok) throw new Error('Failed to load posts.json (status: ' + r.status + ')');
                                return r.json();
                            })
                            .then(function(data) {
                                try {
                                    sessionStorage.setItem('microsys_manifest_v2', JSON.stringify(data));
                                    sessionStorage.setItem('microsys_manifest_v2_time', Date.now().toString());
                                } catch (e) {}
                                resolve(data);
                            })
                            .catch(function(err) {
                                try {
                                    const stale = sessionStorage.getItem('microsys_manifest_v2');
                                    if (stale) return resolve(JSON.parse(stale));
                                } catch (e) {}
                                reject(err);
                            });
                    });
                };

                loadManifest()
                    .then(function (posts) {
                        const postMeta = posts.find(function (p) { return p.slug === slug; });
                        if (!postMeta) {
                            throw new Error('Article "' + slug + '" not found in posts.json.');
                        }
                        if (isPrerendered) {
                            renderPost(postMeta, null, posts);
                        } else {
                            // Fetch the Markdown file using the path in content_file
                            const mdPath = postMeta.content_file || ('posts/' + slug + '.md');
                            return fetch(mdPath)
                                .then(function (response) {
                                    if (!response.ok) {
                                        // Fallback with blogs/ prefix if not intercepted
                                        if (!mdPath.startsWith('blogs/')) {
                                            return fetch('blogs/' + mdPath.replace(/^\.?\//, '')).then(function (r2) {
                                                if (!r2.ok) throw new Error('Markdown file not found: ' + mdPath);
                                                return r2.text();
                                            });
                                        }
                                        throw new Error('Markdown file not found: ' + mdPath);
                                    }
                                    return response.text();
                                })
                                .then(function (markdownText) {
                                    const renderWhenReady = function() {
                                        if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
                                            const htmlContent = marked.parse(markdownText);
                                            renderPost(postMeta, htmlContent, posts);
                                        } else {
                                            setTimeout(renderWhenReady, 50);
                                        }
                                    };
                                    renderWhenReady();
                                });
                        }
                    })
                    .catch(function (error) {
                        if (isPrerendered) {
                            console.warn('Failed to load interactive features:', error);
                        } else {
                            console.error('Error loading post:', error);
                            showError(error.message + '<br><small><a href="blog.html" style="color:var(--color-primary);text-decoration:underline;">Return to all articles</a></small>');
                        }
                    });
            }
        })();
