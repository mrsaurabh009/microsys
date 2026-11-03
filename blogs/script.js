/**
 *VYOMARC — Blog Script
 * Fetches posts.json and dynamically renders post cards on the landing page.
 * Each card links to post.html?file=<slug> for individual article viewing.
 */

(function () {
    'use strict';

    window.vyomarcFetchManifest = function() {
        return new Promise(function(resolve, reject) {
            try {
                const cached = sessionStorage.getItem('microsys_manifest_v2');
                const timestamp = sessionStorage.getItem('microsys_manifest_v2_time');
                if (cached && timestamp && (Date.now() - parseInt(timestamp, 10) < 300000)) {
                    return resolve(JSON.parse(cached));
                }
            } catch (e) {}

            fetch('./posts.json')
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

    if (window.VYOMARC_FETCH_ONLY) return;

    const gridContainer = document.getElementById('posts-grid-container');

    /**
     * Format a date string into a human-readable format.
     * @param {string} dateStr - ISO date string (e.g., "2026-07-01")
     * @returns {string} Formatted date (e.g., "July 1, 2026")
     */
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const cleanDate = dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00';
        const date = new Date(cleanDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', options);
    }

    /**
     * Truncate text to a given character limit without cutting words.
     * @param {string} text - The text to truncate
     * @param {number} limit - Max character count
     * @returns {string} Truncated text with ellipsis if needed
     */
    function truncateExcerpt(text, limit) {
        if (!text) return '';
        if (text.length <= limit) return text;
        const truncated = text.substring(0, limit);
        const lastSpace = truncated.lastIndexOf(' ');
        return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…';
    }

    /**
     * Create a single post card DOM element.
     * <!-- PHP: foreach($blogs as $blog) { -->
     * @param {object} post - Post metadata object
     * @returns {HTMLElement} The card element
     */
    function createPostCard(post) {
        // <!-- PHP: foreach($blogs as $blog) { -->
        const card = document.createElement('article');
        card.className = 'post-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
        card.setAttribute('aria-label', 'Read article: ' + post.title);

        // Link: <!-- PHP: href="blog-detail.php?slug=<?php echo $blog['slug']; ?>" -->
        const cardUrl = 'blog-detail.html?slug=' + encodeURIComponent(post.slug);

        card.addEventListener('click', function (e) {
            if (e.target.closest('.post-card-link')) return;
            window.location.href = cardUrl;
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = cardUrl;
            }
        });

        if (post.is_featured) {
            const badge = document.createElement('div');
            badge.className = 'latest-badge';
            badge.textContent = 'Featured';
            card.appendChild(badge);
        } else if (post.isNewestBadge) {
            const badge = document.createElement('div');
            badge.className = 'latest-badge';
            badge.textContent = 'Latest';
            card.appendChild(badge);
        }

        // Category: <!-- PHP: echo $blog['category']; -->
        if (post.category) {
            const catTag = document.createElement('div');
            catTag.className = 'category-tag post-card-category';
            catTag.textContent = post.category;
            card.appendChild(catTag);
        }

        // Thumbnail normalization
        // Image: <!-- PHP: echo $blog['thumbnail_url']; -->
        const rawThumb = post.thumbnail_url || post.thumbnail || '';
        let finalThumb = rawThumb;
        if (finalThumb && !finalThumb.startsWith('http') && !finalThumb.startsWith('blogs/') && !finalThumb.startsWith('data:')) {
            finalThumb = 'blogs/' + finalThumb.replace(/^\.?\//, '');
        }

        const img = document.createElement('img');
        img.className = 'post-card-thumbnail';
        img.src = finalThumb;
        img.alt = post.title;
        img.loading = 'lazy';
        img.onerror = function () {
            // Fallback if image fails to load
            this.src = 'data:image/svg+xml,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="#e0e2e7">' +
                '<rect width="600" height="400"/><text x="300" y="210" text-anchor="middle" ' +
                'font-family="sans-serif" font-size="18" fill="#5a5f6b">Thumbnail</text></svg>'
            );
        };
        card.appendChild(img);

        // Card body
        const body = document.createElement('div');
        body.className = 'post-card-body';

        // Date: <!-- PHP: echo date('M d, Y', strtotime($blog['published_date'])); -->
        const dateEl = document.createElement('span');
        dateEl.className = 'post-card-date';
        dateEl.textContent = formatDate(post.published_date || post.date);
        body.appendChild(dateEl);

        // Title: <!-- PHP: echo $blog['title']; -->
        const titleEl = document.createElement('h3');
        titleEl.className = 'post-card-title';
        titleEl.textContent = post.title;
        body.appendChild(titleEl);

        // Excerpt: <!-- PHP: echo $blog['meta_description']; -->
        const excerptEl = document.createElement('p');
        excerptEl.className = 'post-card-excerpt';
        const excerptText = post.meta_description || post.excerpt || '';
        excerptEl.textContent = truncateExcerpt(excerptText, 150);
        body.appendChild(excerptEl);

        // Link: <!-- PHP: href="blog-detail.php?slug=<?php echo $blog['slug']; ?>" -->
        const linkEl = document.createElement('a');
        linkEl.className = 'post-card-link';
        linkEl.href = cardUrl;
        linkEl.textContent = 'Read Article →';
        body.appendChild(linkEl);

        card.appendChild(body);
        // <!-- PHP: } // end foreach -->
        return card;
    }

    /**
     * Render all post cards into the grid.
     * @param {Array} posts - Array of post metadata objects
     */
    function renderPosts(posts) {
        gridContainer.innerHTML = '';

        if (!posts || posts.length === 0) {
            const isFiltered = searchQuery || (document.getElementById('post-category') && document.getElementById('post-category').value !== 'all');
            gridContainer.innerHTML =
                '<div class="loading-spinner">' + (isFiltered ? 'No articles found matching your criteria. Try different filters.' : 'No articles found. Check back soon!') + '</div>';
            return;
        }

        const fragment = document.createDocumentFragment();
        posts.forEach(function (post) {
            fragment.appendChild(createPostCard(post));
        });
        gridContainer.appendChild(fragment);
    }

    let allPostsData = [];
    const sortSelect = document.getElementById('sort-posts');
    const paginationControls = document.getElementById('pagination-controls');
    let currentPage = 1;
    const POSTS_PER_PAGE = 9;

    const searchInput = document.getElementById('post-search');
    const searchClear = document.getElementById('search-clear');
    const searchLiveRegion = document.getElementById('search-live-region');
    const categorySelect = document.getElementById('post-category');
    let searchQuery = '';
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                searchQuery = e.target.value.trim();
                if (searchClear) {
                    searchClear.style.display = (searchQuery.length > 0 || (categorySelect && categorySelect.value !== 'all')) ? 'flex' : 'none';
                }
                setUrlPage(1, false);
                const currentSort = sortSelect ? sortSelect.value : 'latest';
                sortAndRenderPosts(currentSort, true);
            }, 300);
        });

        if (searchClear) {
            searchClear.addEventListener('click', function() {
                if (searchInput) searchInput.value = '';
                searchQuery = '';
                if (categorySelect) categorySelect.value = 'all';
                const blogCatContainer = document.getElementById('blog-categories');
                if (blogCatContainer) {
                    blogCatContainer.querySelectorAll('.blog-category-btn').forEach(function(b) {
                        const isAll = b.getAttribute('data-category') === 'all';
                        b.classList.toggle('active', isAll);
                        b.setAttribute('aria-selected', isAll ? 'true' : 'false');
                    });
                }
                searchClear.style.display = 'none';
                if (searchInput) searchInput.focus();
                
                // Clear cat param from URL if it exists
                const url = new URL(window.location);
                if (url.searchParams.has('cat')) {
                    url.searchParams.delete('cat');
                    window.history.replaceState({}, '', url);
                }

                setUrlPage(1, false);
                const currentSort = sortSelect ? sortSelect.value : 'latest';
                sortAndRenderPosts(currentSort, true);
            });
        }
    }

    const blogCategoriesContainer = document.getElementById('blog-categories');
    if (blogCategoriesContainer) {
        blogCategoriesContainer.addEventListener('click', function(e) {
            const btn = e.target.closest('.blog-category-btn');
            if (!btn) return;
            const cat = btn.getAttribute('data-category') || 'all';

            blogCategoriesContainer.querySelectorAll('.blog-category-btn').forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            if (categorySelect) {
                categorySelect.value = cat;
            }
            if (searchClear) {
                searchClear.style.display = (searchQuery.length > 0 || cat !== 'all') ? 'flex' : 'none';
            }

            const url = new URL(window.location);
            if (cat === 'all') {
                url.searchParams.delete('cat');
            } else {
                url.searchParams.set('cat', cat);
            }
            window.history.replaceState({}, '', url);

            setUrlPage(1, false);
            const currentSort = sortSelect ? sortSelect.value : 'latest';
            sortAndRenderPosts(currentSort, true);
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            if (searchClear) {
                searchClear.style.display = (searchQuery.length > 0 || categorySelect.value !== 'all') ? 'flex' : 'none';
            }
            setUrlPage(1, false);
            const currentSort = sortSelect ? sortSelect.value : 'latest';
            sortAndRenderPosts(currentSort, true);
        });
    }

    function getPageFromUrl() {
        const params = new URLSearchParams(window.location.search);
        let p = parseInt(params.get('page'), 10);
        if (isNaN(p) || p < 1) p = 1;
        return p;
    }

    function setUrlPage(page, replace = false) {
        const url = new URL(window.location);
        if (page <= 1) {
            url.searchParams.delete('page');
        } else {
            url.searchParams.set('page', page);
        }
        if (replace) {
            window.history.replaceState({ page: page }, '', url);
        } else {
            window.history.pushState({ page: page }, '', url);
        }
    }

    window.addEventListener('popstate', function(e) {
        currentPage = getPageFromUrl();
        const currentSort = sortSelect ? sortSelect.value : 'latest';
        sortAndRenderPosts(currentSort, false);
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            currentPage = 1;
            setUrlPage(1);
            sortAndRenderPosts(e.target.value, false);
        });
    }

    function renderPagination(totalPages) {
        if (!paginationControls) return;
        
        if (totalPages <= 1) {
            paginationControls.style.display = 'none';
            return;
        }
        paginationControls.style.display = 'flex';
        paginationControls.innerHTML = '';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn pagination-prev';
        prevBtn.textContent = '← Prev';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
        paginationControls.appendChild(prevBtn);

        const pageList = document.createElement('ul');
        pageList.className = 'pagination-list';
        
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-num';
            if (i === currentPage) {
                pageBtn.classList.add('active');
                pageBtn.setAttribute('aria-current', 'page');
            }
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => changePage(i));
            li.appendChild(pageBtn);
            pageList.appendChild(li);
        }
        paginationControls.appendChild(pageList);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn pagination-next';
        nextBtn.textContent = 'Next →';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
        paginationControls.appendChild(nextBtn);
    }

    function changePage(newPage) {
        const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE) || 1;
        if (newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        setUrlPage(currentPage);
        const currentSort = sortSelect ? sortSelect.value : 'latest';
        sortAndRenderPosts(currentSort, false);
        
        const gridEl = document.getElementById('posts-grid');
        if (gridEl) {
            const yOffset = -20; 
            const y = gridEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }

    function sortAndRenderPosts(sortOrder, resetPage = true) {
        if (resetPage) currentPage = 1;
        
        let sorted = allPostsData.slice();
        
        if (searchQuery || (categorySelect && categorySelect.value !== 'all')) {
            const currentCat = categorySelect ? categorySelect.value : 'all';
            
            if (searchQuery) {
                const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
                sorted = sorted.filter(function(post) {
                    const searchString = (post.title + ' ' + (post.meta_description || post.excerpt || '') + ' ' + (post.author_name || post.author || '') + ' ' + post.slug).toLowerCase();
                    const matchesSearch = queryWords.every(function(word) {
                        return searchString.indexOf(word) > -1;
                    });
                    const matchesCat = currentCat === 'all' || post.category === currentCat;
                    return matchesSearch && matchesCat;
                });
            } else {
                sorted = sorted.filter(function(post) {
                    return currentCat === 'all' || post.category === currentCat;
                });
            }
            
            if (searchLiveRegion) {
                searchLiveRegion.textContent = 'Found ' + sorted.length + ' post' + (sorted.length === 1 ? '' : 's') + '.';
            }
        } else {
            if (searchLiveRegion) {
                searchLiveRegion.textContent = 'Articles loaded.';
            }
        }

        sorted.reverse().sort(function (a, b) {
            const dateA = a.published_date || a.date || '';
            const dateB = b.published_date || b.date || '';
            const timeA = new Date(String(dateA).replace(/-/g, '/')).getTime() || 0;
            const timeB = new Date(String(dateB).replace(/-/g, '/')).getTime() || 0;
            return sortOrder === 'oldest' ? timeA - timeB : timeB - timeA;
        });

        const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE) || 1;
        if (currentPage > totalPages) {
            currentPage = totalPages;
            setUrlPage(currentPage, true);
        }

        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const pagePosts = sorted.slice(startIndex, endIndex);

        renderPosts(pagePosts);
        renderPagination(totalPages);
    }

    /**
     * Fetch the posts manifest and render the grid.
     */
    function loadPosts() {
        window.vyomarcFetchManifest()
            .then(function (posts) {
                // Filter out posts where status is not "published"
                const publishedPosts = posts.filter(function (post) {
                    return post.status === 'published';
                });

                let tempSorted = publishedPosts.slice().reverse().sort(function (a, b) {
                    const dateA = a.published_date || a.date || '';
                    const dateB = b.published_date || b.date || '';
                    const timeA = new Date(String(dateA).replace(/-/g, '/')).getTime() || 0;
                    const timeB = new Date(String(dateB).replace(/-/g, '/')).getTime() || 0;
                    return timeB - timeA;
                });
                for (let i = 0; i < Math.min(3, tempSorted.length); i++) {
                    tempSorted[i].isNewestBadge = true;
                }

                allPostsData = publishedPosts;
                
                const params = new URLSearchParams(window.location.search);
                const catParam = params.get('cat');
                if (catParam) {
                    if (categorySelect) {
                        const optionExists = Array.from(categorySelect.options).some(opt => opt.value === catParam);
                        if (optionExists) {
                            categorySelect.value = catParam;
                        }
                    }
                    if (blogCategoriesContainer) {
                        const matchingBtn = blogCategoriesContainer.querySelector('[data-category="' + catParam + '"]');
                        if (matchingBtn) {
                            blogCategoriesContainer.querySelectorAll('.blog-category-btn').forEach(function(b) {
                                b.classList.remove('active');
                                b.setAttribute('aria-selected', 'false');
                            });
                            matchingBtn.classList.add('active');
                            matchingBtn.setAttribute('aria-selected', 'true');
                        }
                    }
                    if (searchClear) searchClear.style.display = 'flex';
                }

                currentPage = getPageFromUrl();
                setUrlPage(currentPage, true);

                const currentSort = sortSelect ? sortSelect.value : 'latest';
                sortAndRenderPosts(currentSort, false);
            })
            .catch(function (error) {
                console.error('Error loading posts:', error);
                gridContainer.innerHTML =
                    '<div class="loading-spinner">⚠️ Unable to load articles. ' +
                    'Make sure you\'re running this on a local server.</div>';
            });
    }

    // Initialize on page load
    if (gridContainer) {
        loadPosts();
    }
})();

(function() {
    'use strict';
    const hdr = document.querySelector('.header-main');
    const btn = document.querySelector('.menu-trigger');
    const navWrp = document.querySelector('.menu-container');
    
    if (!hdr || !btn || !navWrp) return;

    const bgLayer = document.createElement('div');
    bgLayer.className = 'backdrop-layer';
    document.body.appendChild(bgLayer);

    const closeNav = () => {
        btn.setAttribute('aria-expanded', 'false');
        navWrp.classList.remove('menu-is-open');
        bgLayer.classList.remove('backdrop-is-active');
        document.body.classList.remove('is-locked');
    };

    const openNav = () => {
        btn.setAttribute('aria-expanded', 'true');
        navWrp.classList.add('menu-is-open');
        bgLayer.classList.add('backdrop-is-active');
        document.body.classList.add('is-locked');
    };

    btn.addEventListener('click', () => {
        if (btn.getAttribute('aria-expanded') === 'true') {
            closeNav();
        } else {
            openNav();
        }
    });

    bgLayer.addEventListener('click', closeNav);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNav();
        }
    });



    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            hdr.setAttribute('data-is-scrolled', 'true');
        } else {
            hdr.setAttribute('data-is-scrolled', 'false');
        }
    }, { passive: true });
})();