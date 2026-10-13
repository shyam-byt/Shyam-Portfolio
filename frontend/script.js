// Profile information
const PROFILE = {
    github: "Shyam-byt",
    linkedin: "YOUR_LINKEDIN_PROFILE_URL",
    instagram: "YOUR_INSTAGRAM_PROFILE_URL"
};

const githubLink = `https://github.com/${PROFILE.github}`;

const githubElement = document.getElementById("github-link");
const contactGithubElement = document.getElementById("contact-github-link");
const linkedinElement = document.getElementById("linkedin-link");
const instagramElement = document.getElementById("instagram-link");
const contactLinkedinElement = document.getElementById("contact-linkedin-link");

if (githubElement) githubElement.href = githubLink;
if (contactGithubElement) contactGithubElement.href = githubLink;
if (linkedinElement) linkedinElement.href = PROFILE.linkedin;
if (instagramElement) instagramElement.href = PROFILE.instagram;
if (contactLinkedinElement) contactLinkedinElement.href = PROFILE.linkedin;

async function loadGitHubStats() {
const followers = document.getElementById("followers");
const repositories = document.getElementById("repositories");
const status = document.getElementById("github-status");
const message = document.getElementById("stats-message");

if (
    !PROFILE.github ||
    PROFILE.github === "YOUR_GITHUB_USERNAME"
) {
    message.textContent =
        "Add your GitHub username in script.js to load real statistics.";
    return;
}

try {
    const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(PROFILE.github)}`
    );

    if (!response.ok) {
        throw new Error("GitHub profile could not be loaded.");
    }

    const data = await response.json();

    followers.textContent = data.followers;
    repositories.textContent = data.public_repos;
    status.textContent = "Connected";

    message.textContent =
        `Live public profile data for @${data.login}. ` +
        "Statistics may be cached or subject to API limits.";
} catch (error) {
    status.textContent = "Unavailable";
    message.textContent =
        "GitHub statistics could not be loaded. Check your username, internet connection, and API availability.";
    console.error(error);
}

}

loadGitHubStats();
// =====================================
// PREMIUM SCROLL REVEAL ANIMATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {
 const elements = document.querySelectorAll(
    ".project-card, .section-label, section h2, " +
    ".section-description, .skill-card, .github-panel, " +
    ".premium-skill-card"
);

    elements.forEach((element) => {
        // Avoid applying reveal twice
        if (element.classList.contains("reveal")) {
            return;
        }

        element.classList.add("reveal");
    });

    // Reveal elements as they enter the screen
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        document.querySelectorAll(".reveal").forEach((element) => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.add("visible");
        });
    }
});
// ==================================
// EMAILJS CONTACT FORM
// ==================================

emailjs.init({
    publicKey: "k6dxVvOcljJZXNMX0"
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const status = document.getElementById(
            "contact-form-status"
        );

        const button = contactForm.querySelector(
            'button[type="submit"]'
        );

        button.disabled = true;
        button.querySelector("span").textContent = "Sending...";
        status.className = "contact-form-status";
        status.textContent = "";

        try {
            await emailjs.sendForm(
                "service_rmtq4xg",
                "template_x1l8ske",
                contactForm
            );

            status.textContent =
                "Message sent successfully! Thank you for contacting me.";

            status.classList.add("success");
            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error:", error);

            status.textContent =
                "Message could not be sent. Please try again.";

            status.classList.add("error");

        } finally {
            button.disabled = false;
            button.querySelector("span").textContent = "Send Message";
        }
    });
}
// ==================================
// ANIMATED TYPING EFFECT
// ==================================

const typingElement = document.getElementById("typing-text");

if (typingElement) {
    const typingWords = [
        "Python Developer",
        "Backend Developer",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = typingWords[0].length;
    let deleting = true;

    function typeEffect() {
        const currentWord = typingWords[wordIndex];

        if (deleting) {
            charIndex--;
            typingElement.textContent =
                currentWord.substring(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % typingWords.length;
                setTimeout(typeEffect, 400);
                return;
            }

            setTimeout(typeEffect, 55);
        } else {
            const nextWord = typingWords[wordIndex];

            charIndex++;
            typingElement.textContent =
                nextWord.substring(0, charIndex);

            if (charIndex >= nextWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }

            setTimeout(typeEffect, 90);
        }
    }

    setTimeout(typeEffect, 1400);
}
// ==================================
// PREMIUM MOUSE GLOW EFFECT
// ==================================

const mouseGlow = document.createElement("div");

mouseGlow.className = "mouse-glow";
mouseGlow.setAttribute("aria-hidden", "true");

document.body.appendChild(mouseGlow);

document.addEventListener("mousemove", function (event) {
    mouseGlow.style.left = event.clientX + "px";
    mouseGlow.style.top = event.clientY + "px";
});

// ==================================
// ANIMATED STATISTICS
// ==================================

const statNumbers = document.querySelectorAll(".stat-number");

if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                counter.textContent = Math.floor(target * progress);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(counter => statsObserver.observe(counter));
}
// Connect Frontend to FastAPI Backend

async function loadProfileFromBackend() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/profile"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const profile = await response.json();

        console.log("Backend connected successfully!");
        console.log("Name:", profile.name);
        console.log("Role:", profile.role);
        console.log("Skills:", profile.skills);
        console.log("Projects:", profile.projects);

    } catch (error) {
        console.error("Backend connection failed:", error);
    }
}

loadProfileFromBackend();
async function loadProfileFromBackend() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/profile"
        );

        if (!response.ok) {
            throw new Error("Profile API request failed");
        }

        const profile = await response.json();

        const nameElement = document.getElementById("backend-name");
        const roleElement = document.getElementById("backend-role");

        if (nameElement) {
            nameElement.textContent = profile.name;
        }

        if (roleElement) {
            roleElement.textContent = profile.role;
        }

        console.log("Profile loaded successfully!");

    } catch (error) {
        console.error("Profile loading failed:", error);
    }
}

loadProfileFromBackend();