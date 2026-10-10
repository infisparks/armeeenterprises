/**
 * Armee Enterprises - Noori Horizon Hero Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Modals Setup ---
  const enquiryModal = document.getElementById('enquiryModal');
  const videoModal = document.getElementById('videoModal');
  const projectModal = document.getElementById('projectModal');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const openEnquiryBtns = document.querySelectorAll('.js-open-enquiry');
  const openVideoBtns = document.querySelectorAll('.js-open-video');
  const openProjectBtns = document.querySelectorAll('.js-open-project');
  const mobileToggle = document.getElementById('mobileToggle');
  const closeDrawerBtn = document.getElementById('closeDrawer');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any iframe video playing on modal close
    const iframe = modal.querySelector('iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = src;
    }
  }

  // Bind Open Buttons
  openEnquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(enquiryModal);
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    });
  });

  openVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(videoModal);
    });
  });

  openProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(projectModal);
    });
  });

  // Bind Close Buttons
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close on Backdrop Click
  [enquiryModal, videoModal, projectModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape Key to Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [enquiryModal, videoModal, projectModal].forEach(closeModal);
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    }
  });

  // Mobile Drawer Toggle
  const mobileDrawerToggles = document.querySelectorAll('.js-mobile-drawer-toggle, #mobileToggle');
  mobileDrawerToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Handle Form Submission
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for your enquiry. Our luxury property advisor will contact you shortly.');
        enquiryForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal(enquiryModal);
      }, 1000);
    });
  }
});
