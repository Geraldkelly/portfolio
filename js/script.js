document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => links.classList.toggle('active'));
        links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');
    const ok = document.getElementById('formOk');
    const err = document.getElementById('formErr');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const orig = btn.textContent;
            btn.textContent = 'sending...';
            btn.disabled = true;
            ok.style.display = 'none';
            err.style.display = 'none';

            const data = Object.fromEntries(new FormData(form).entries());

            fetch('https://formsubmit.co/ajax/geraldkellynwankwo@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(res => {
                if (res.success === 'true' || res.success === true) {
                    ok.style.display = 'block';
                    form.reset();
                } else throw new Error();
            })
            .catch(() => err.style.display = 'block')
            .finally(() => { btn.textContent = orig; btn.disabled = false; });
        });
    }
});