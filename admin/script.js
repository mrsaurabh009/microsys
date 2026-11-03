/**
 * Microsys Admin Panel Client Interactions
 * - Mobile Sidebar Navigation Toggle (Hamburger button, backdrop overlay, escape key)
 * - Add / Edit Form Toggle (Show on "+ Add", scroll into view, hide on "Cancel")
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. MOBILE SIDEBAR TOGGLE ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.querySelector('.admin-sidebar');
  const closeSidebarBtn = document.getElementById('close-sidebar') || document.querySelector('.close-sidebar-btn');
  let sidebarOverlay = document.getElementById('sidebar-overlay') || document.querySelector('.admin-sidebar-overlay');

  // Dynamically inject backdrop overlay if not already present
  if (!sidebarOverlay && sidebar) {
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.id = 'sidebar-overlay';
    sidebarOverlay.className = 'admin-sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
  }

  function toggleSidebar(forceState) {
    if (!sidebar) return;
    const shouldOpen = typeof forceState === 'boolean' 
      ? forceState 
      : !sidebar.classList.contains('is-open');

    if (shouldOpen) {
      sidebar.classList.add('is-open');
      if (sidebarOverlay) sidebarOverlay.classList.add('is-active');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('sidebar-open');
    } else {
      sidebar.classList.remove('is-open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('is-active');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('sidebar-open');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar(false);
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      toggleSidebar(false);
    });
  }

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('is-open')) {
      toggleSidebar(false);
    }
  });

  // ==================== 2. ADD / EDIT FORM TOGGLE ====================
  const toggleFormBtn = document.getElementById('toggle-form-btn') || 
                        document.querySelector('a[href="#add-edit-form"]') ||
                        document.querySelector('a[href$="-form-container"]');
  const formContainer = document.getElementById('add-edit-form') || 
                        document.querySelector('[id$="-form-container"]');
  const cancelBtn = document.getElementById('cancel-form-btn') || 
                    (formContainer ? formContainer.querySelector('.btn-cancel-link, .btn-secondary') : null);

  if (formContainer && toggleFormBtn) {
    // Check if page opened with an edit query param or direct anchor hash
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.has('action') || urlParams.has('edit') || urlParams.has('id');
    const hasHash = window.location.hash === '#add-edit-form' || window.location.hash.includes('form');

    // Default state: if not in edit mode and no form hash, collapse the form
    if (!isEditMode && !hasHash) {
      formContainer.classList.add('is-hidden');
    } else {
      formContainer.classList.remove('is-hidden');
    }

    // Toggle button opens the form smoothly
    toggleFormBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyHidden = formContainer.classList.contains('is-hidden');

      if (isCurrentlyHidden) {
        formContainer.classList.remove('is-hidden');
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Focus first input field
        const firstInput = formContainer.querySelector('input:not([type="hidden"]), select, textarea');
        if (firstInput) setTimeout(() => firstInput.focus(), 250);
      } else {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Cancel button collapses the form and restores table view
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        if (!isEditMode) {
          e.preventDefault();
          formContainer.classList.add('is-hidden');
          const form = formContainer.querySelector('form');
          if (form) form.reset();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }
});
