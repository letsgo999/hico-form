// APEC 2024 Korean Cultural Events - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    initializeFormValidation();
    
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Smooth scroll functions
function scrollToPerformances() {
    const element = document.getElementById('performances');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToInfo() {
    const element = document.getElementById('info');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functions
function openRegistrationModal(performanceType) {
    const modal = document.getElementById('registrationModal');
    const modalTitle = document.getElementById('modalTitle');
    const performanceTypeInput = document.getElementById('performanceType');
    
    // Set modal title and performance type
    if (performanceType === 'traditional') {
        modalTitle.textContent = '한국 전통무용 공연 신청';
        performanceTypeInput.value = 'traditional';
    } else if (performanceType === 'kpop') {
        modalTitle.textContent = 'K-Pop 아이돌 공연 신청';
        performanceTypeInput.value = 'kpop';
    }
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('registrationForm').reset();
}

// Close modal when clicking outside
document.getElementById('registrationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeRegistrationModal();
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRegistrationModal();
    }
});

// Form submission handler
function submitRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>처리 중...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Add timestamp and generate ID
        data.id = generateUUID();
        data.submittedAt = new Date().toISOString();
        data.status = 'pending';
        
        // Store in localStorage for demo purposes
        storeRegistration(data);
        
        // Show success message
        showSuccessMessage(data);
        
        // Reset form and close modal
        form.reset();
        closeRegistrationModal();
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 1500); // Simulate network delay
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('이름을 정확히 입력해주세요.');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('올바른 이메일 주소를 입력해주세요.');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('올바른 전화번호를 입력해주세요.');
    }
    
    if (!data.agree) {
        errors.push('개인정보 수집 및 이용에 동의해주세요.');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Korean format)
function isValidPhone(phone) {
    const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Store registration data
function storeRegistration(data) {
    let registrations = JSON.parse(localStorage.getItem('apec_registrations') || '[]');
    registrations.push(data);
    localStorage.setItem('apec_registrations', JSON.stringify(registrations));
}

// Generate UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Show success message
function showSuccessMessage(data) {
    const performanceName = data.performanceType === 'traditional' ? '한국 전통무용 공연' : 'K-Pop 아이돌 공연';
    
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'modal show';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="p-8 text-center">
                <div class="mb-6">
                    <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">신청이 완료되었습니다!</h3>
                    <p class="text-gray-600">신청해주셔서 감사합니다.</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h4 class="font-bold text-gray-800 mb-3">신청 정보</h4>
                    <div class="space-y-2 text-sm text-gray-700">
                        <p><span class="font-semibold">신청번호:</span> ${data.id.slice(0, 8).toUpperCase()}</p>
                        <p><span class="font-semibold">공연:</span> ${performanceName}</p>
                        <p><span class="font-semibold">신청자:</span> ${data.name}</p>
                        <p><span class="font-semibold">이메일:</span> ${data.email}</p>
                        <p><span class="font-semibold">인원:</span> ${data.companions}명</p>
                    </div>
                </div>
                
                <div class="bg-blue-50 rounded-lg p-4 mb-6">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        당첨 발표는 10월 27일 오전 9시에 이메일로 안내드립니다.
                    </p>
                </div>
                
                <button onclick="closeSuccessModal()" class="btn-primary text-white px-8 py-3 rounded-lg font-semibold">
                    확인
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            closeSuccessModal();
        }
    }, 10000);
}

// Close success modal
function closeSuccessModal() {
    const successModal = document.querySelector('.modal.show');
    if (successModal && successModal !== document.getElementById('registrationModal')) {
        successModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Show error message
function showErrorMessage(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-50 border border-red-200 rounded-lg p-4 mb-4';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-red-500 mr-3 mt-1"></i>
            <div>
                <h4 class="font-semibold text-red-800 mb-2">다음 항목을 확인해주세요:</h4>
                <ul class="text-red-700 text-sm space-y-1">
                    ${errors.map(error => `<li>• ${error}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Insert before form
    const form = document.getElementById('registrationForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(errorDiv)) {
            errorDiv.remove();
        }
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.performance-card, .fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize form validation
function initializeFormValidation() {
    // Add real-time validation
    const inputs = document.querySelectorAll('#registrationForm input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.classList.remove('border-red-500', 'bg-red-50');
            
            // Remove field-specific error messages
            const errorMsg = this.parentNode.querySelector('.field-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
    
    // Format phone number input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 3 && value.length <= 7) {
                value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
            } else if (value.length >= 8) {
                value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
            }
            this.value = value;
        });
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling and message
    field.classList.remove('border-red-500', 'bg-red-50');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    switch (field.type) {
        case 'text':
            if (field.name === 'name' && value.length < 2) {
                isValid = false;
                errorMessage = '이름을 2글자 이상 입력해주세요.';
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = '올바른 이메일 형식이 아닙니다.';
            }
            break;
        case 'tel':
            if (!isValidPhone(value)) {
                isValid = false;
                errorMessage = '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('border-red-500', 'bg-red-50');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i>${errorMessage}`;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Utility function to get registration statistics (for admin purposes)
function getRegistrationStats() {
    const registrations = JSON.parse(localStorage.getItem('apec_registrations') || '[]');
    
    const stats = {
        total: registrations.length,
        traditional: registrations.filter(r => r.performanceType === 'traditional').length,
        kpop: registrations.filter(r => r.performanceType === 'kpop').length,
        byNationality: {}
    };
    
    registrations.forEach(reg => {
        stats.byNationality[reg.nationality] = (stats.byNationality[reg.nationality] || 0) + 1;
    });
    
    return stats;
}

// Export functions for console debugging (development only)
if (typeof window !== 'undefined') {
    window.apecEvents = {
        getRegistrationStats,
        openRegistrationModal,
        closeRegistrationModal,
        scrollToPerformances,
        scrollToInfo
    };
}