// Feedback Widget Web Component
class FeedbackWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
  }

  connectedCallback() {
    this.projectId = this.getAttribute('projectId');
    this.websiteName = this.getAttribute('websiteName') || 'Website';
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .feedback-button {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feedback-button:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        .feedback-modal {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: none;
          animation: slideUp 0.3s ease-out;
        }

        .feedback-modal.open {
          display: block;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 20px 20px 10px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .modal-subtitle {
          margin: 4px 0 0;
          font-size: 14px;
          color: #6b7280;
        }

        .modal-body {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          width: 100%;
          min-height: 80px;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          resize: vertical;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .rating-group {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .star {
          cursor: pointer;
          font-size: 20px;
          color: #d1d5db;
          transition: color 0.2s ease;
        }

        .star.active,
        .star:hover {
          color: #fbbf24;
        }

        .modal-footer {
          padding: 0 20px 20px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          flex: 1;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }

        .btn-primary:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .success-message {
          text-align: center;
          padding: 40px 20px;
          color: #059669;
        }

        .success-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 4px;
        }

        .close-btn:hover {
          background: #f3f4f6;
        }

        .error-message {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
        }

        @media (max-width: 480px) {
          :host {
            bottom: 10px;
            right: 10px;
          }
          
          .feedback-modal {
            bottom: 70px;
            right: 10px;
            left: 10px;
            width: auto;
          }
        }
      </style>

      <button class="feedback-button" id="feedbackBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
        Feedback
      </button>

      <div class="feedback-modal" id="feedbackModal">
        <button class="close-btn" id="closeBtn">&times;</button>
        <div id="feedbackForm">
          <div class="modal-header">
            <h3 class="modal-title">Share your feedback</h3>
            <p class="modal-subtitle">Help us improve ${this.websiteName}</p>
          </div>
          <div class="modal-body">
            <form id="feedbackFormElement">
              <div class="form-group">
                <label class="form-label">Rating</label>
                <div class="rating-group" id="ratingGroup">
                  ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}">★</span>`).join('')}
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="name">Name</label>
                <input type="text" id="name" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="feedback">Your feedback</label>
                <textarea id="feedback" class="form-textarea" placeholder="Tell us what you think..." required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="submitBtn">Send Feedback</button>
          </div>
        </div>
        <div id="successMessage" class="success-message" style="display: none;">
          <div class="success-icon">✓</div>
          <h3>Thank you!</h3>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const feedbackBtn = this.shadowRoot.getElementById('feedbackBtn');
    const modal = this.shadowRoot.getElementById('feedbackModal');
    const closeBtn = this.shadowRoot.getElementById('closeBtn');
    const cancelBtn = this.shadowRoot.getElementById('cancelBtn');
    const submitBtn = this.shadowRoot.getElementById('submitBtn');
    const ratingGroup = this.shadowRoot.getElementById('ratingGroup');
    const form = this.shadowRoot.getElementById('feedbackFormElement');

    let selectedRating = 5;

    // Toggle modal
    feedbackBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      modal.classList.toggle('open', this.isOpen);
    });

    // Close modal
    const closeModal = () => {
      this.isOpen = false;
      modal.classList.remove('open');
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Rating system
    ratingGroup.addEventListener('click', (e) => {
      if (e.target.classList.contains('star')) {
        selectedRating = parseInt(e.target.dataset.rating);
        this.updateStars(selectedRating);
      }
    });

    ratingGroup.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('star')) {
        const rating = parseInt(e.target.dataset.rating);
        this.updateStars(rating);
      }
    });

    ratingGroup.addEventListener('mouseleave', () => {
      this.updateStars(selectedRating);
    });

    // Form submission
    submitBtn.addEventListener('click', async () => {
      const name = this.shadowRoot.getElementById('name').value.trim();
      const email = this.shadowRoot.getElementById('email').value.trim();
      const feedback = this.shadowRoot.getElementById('feedback').value.trim();

      if (!name || !email || !feedback) {
        alert('Please fill in all fields');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Get the current domain to make API calls to the correct backend
        const apiUrl = window.location.origin.includes('localhost') 
          ? 'http://localhost:3000/api/feedback'
          : `${window.location.protocol}//${window.location.hostname}/api/feedback`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            feedback,
            rating: selectedRating,
            projectid: parseInt(this.projectId)
          })
        });

        if (response.ok) {
          this.showSuccessMessage();
          form.reset();
          selectedRating = 5;
          this.updateStars(5);
        } else {
          throw new Error('Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Feedback';
      }
    });

    // Initialize stars
    this.updateStars(selectedRating);
  }

  updateStars(rating) {
    const stars = this.shadowRoot.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < rating);
    });
  }

  showSuccessMessage() {
    const form = this.shadowRoot.getElementById('feedbackForm');
    const success = this.shadowRoot.getElementById('successMessage');
    
    form.style.display = 'none';
    success.style.display = 'block';

    setTimeout(() => {
      form.style.display = 'block';
      success.style.display = 'none';
      this.isOpen = false;
      this.shadowRoot.getElementById('feedbackModal').classList.remove('open');
    }, 3000);
  }
}

// Register the custom element
customElements.define('feedback-widget', FeedbackWidget);
