// Switch between blog posts
function showPost(index) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => post.classList.remove('active'));
    posts[index].classList.add('active');
}
// Dark Mode Toggle
const toggleBtn = document.getElementById('themeToggle');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = ' Light Mode';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = 'Dark Mode';
    }
});


// Add comments dynamically
function addComment(button) {
    const commentSection = button.parentElement;
    const name = commentSection.querySelector('.name').value;
    const message = commentSection.querySelector('.message').value;
    const list = commentSection.querySelector('.comment-list');

    if (name === '' || message === '') {
        alert('Please fill all fields');
        return;
    }

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

    list.appendChild(comment);

    commentSection.querySelector('.name').value = '';
    commentSection.querySelector('.message').value = '';
}

function showPost(index) {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        post.classList.remove('active');
        post.style.display = 'none';
    });

    const activePost = posts[index];
    activePost.style.display = 'block';

    // Trigger reflow for animation
    void activePost.offsetWidth;

    activePost.classList.add('active');
}
// Initialize first post

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
