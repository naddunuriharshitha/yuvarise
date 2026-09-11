/* =========================================================
   YUVARISE - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });


    /* =====================================================
       2. MOBILE MENU
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const navLinksContainer = document.querySelector(".nav-links");

    if (navbar && navLinksContainer) {

        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open Menu");

        navbar.insertBefore(menuButton, navLinksContainer);

        menuButton.addEventListener("click", function () {

            navLinksContainer.classList.toggle("show");

            if (navLinksContainer.classList.contains("show")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }

        });


        /* Close menu after clicking a link */

        navLinksContainer.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinksContainer.classList.remove("show");
                menuButton.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       3. SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId !== "#") {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".feature-card, .habit-card, .zone-card, .story-main-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    }


    /* =====================================================
       5. SEARCH FUNCTION
       ===================================================== */

    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");
    const searchResults = document.querySelector("#searchResults");


    function performSearch() {

        if (!searchInput) {
            return;
        }

        const searchText = searchInput.value
            .trim()
            .toLowerCase();

        if (searchText === "") {

            if (searchResults) {
                searchResults.innerHTML =
                    "<p>Please enter something to search.</p>";
            }

            return;
        }


        const pages = [

            {
                title: "Home",
                description: "YuvaRise home page.",
                url: "index.html"
            },

            {
                title: "About YuvaRise",
                description: "Learn more about YuvaRise.",
                url: "about.html"
            },

            {
                title: "The Book",
                description: "Explore the featured self-development book.",
                url: "book.html"
            },

            {
                title: "Seven Habits",
                description: "Learn seven powerful habits for personal growth.",
                url: "seven-habits.html"
            },

            {
                title: "Student Zone",
                description: "Useful guidance and resources for students.",
                url: "student-zone.html"
            },

            {
                title: "Career Zone",
                description: "Career guidance and future planning.",
                url: "career-zone.html"
            },

            {
                title: "Youth Guide",
                description: "A guide for young people.",
                url: "youth-guide.html"
            },

            {
                title: "Goal Planner",
                description: "Set and plan your personal goals.",
                url: "goal-planner.html"
            },

            {
                title: "Decision Guide",
                description: "Tools to help you make better decisions.",
                url: "decision-guide.html"
            },

            {
                title: "Confidence Zone",
                description: "Build confidence and self-belief.",
                url: "confidence-zone.html"
            },

            {
                title: "Relationships",
                description: "Learn about healthy relationships and communication.",
                url: "relationships.html"
            },

            {
                title: "Motivation",
                description: "Daily motivation and inspiration.",
                url: "motivation.html"
            },

            {
                title: "Progress",
                description: "Track your personal growth progress.",
                url: "progress.html"
            },

            {
                title: "Quiz",
                description: "Test your knowledge and personal growth skills.",
                url: "quiz.html"
            },

            {
                title: "Daily Challenge",
                description: "Take a new growth challenge every day.",
                url: "daily-challenge.html"
            },

            {
                title: "Success Stories",
                description: "Read inspiring success stories.",
                url: "success-stories.html"
            },

            {
                title: "Contact",
                description: "Contact the YuvaRise team.",
                url: "contact.html"
            }

        ];


        const results = pages.filter(function (page) {

            return (
                page.title.toLowerCase().includes(searchText) ||
                page.description.toLowerCase().includes(searchText)
            );

        });


        if (!searchResults) {

            window.location.href =
                "search.html?q=" + encodeURIComponent(searchText);

            return;

        }


        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="no-results">
                    <h3>No results found</h3>
                    <p>Try another keyword.</p>
                </div>
            `;

            return;

        }


        searchResults.innerHTML = results.map(function (page) {

            return `
                <div class="search-result">
                    <h3>
                        <a href="${page.url}">
                            ${page.title}
                        </a>
                    </h3>

                    <p>${page.description}</p>

                    <a href="${page.url}">
                        Explore →
                    </a>
                </div>
            `;

        }).join("");

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {
                    performSearch();
                }

            }
        );

    }


    /* =====================================================
       6. SEARCH QUERY FROM URL
       ===================================================== */

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const query = urlParams.get("q");

    if (query && searchInput) {

        searchInput.value = query;

        setTimeout(function () {
            performSearch();
        }, 100);

    }


    /* =====================================================
       7. REGISTER FORM
       ===================================================== */

    const registerForm =
        document.querySelector("#registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.querySelector("#name")?.value.trim();

                const email =
                    document.querySelector("#email")?.value.trim();

                const password =
                    document.querySelector("#password")?.value;


                if (!name || !email || !password) {

                    alert(
                        "Please fill all the required fields."
                    );

                    return;

                }


                const user = {

                    name: name,
                    email: email,
                    password: password

                };


                localStorage.setItem(
                    "yuvaRiseUser",
                    JSON.stringify(user)
                );


                alert(
                    "Registration successful! Welcome to YuvaRise."
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    /* =====================================================
       8. LOGIN FORM
       ===================================================== */

    const loginForm =
        document.querySelector("#loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.querySelector("#loginEmail")?.value.trim();

                const password =
                    document.querySelector("#loginPassword")?.value;


                const savedUser =
                    JSON.parse(
                        localStorage.getItem("yuvaRiseUser")
                    );


                if (!savedUser) {

                    alert(
                        "No account found. Please register first."
                    );

                    return;

                }


                if (
                    email === savedUser.email &&
                    password === savedUser.password
                ) {

                    localStorage.setItem(
                        "yuvaRiseLoggedIn",
                        "true"
                    );


                    alert(
                        "Login successful! Welcome back."
                    );


                    window.location.href =
                        "index.html";

                } else {

                    alert(
                        "Incorrect email or password."
                    );

                }

            }
        );

    }


    /* =====================================================
       9. LOGOUT
       ===================================================== */

    const logoutButtons =
        document.querySelectorAll(".logout-btn");


    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            localStorage.removeItem(
                "yuvaRiseLoggedIn"
            );

            alert(
                "You have been logged out."
            );

            window.location.href =
                "index.html";

        });

    });


    /* =====================================================
       10. USER NAME DISPLAY
       ===================================================== */

    const userNameElements =
        document.querySelectorAll(".user-name");


    const savedUser =
        JSON.parse(
            localStorage.getItem("yuvaRiseUser")
        );


    if (savedUser) {

        userNameElements.forEach(function (element) {

            element.textContent =
                savedUser.name;

        });

    }


    /* =====================================================
       11. FAVORITES
       ===================================================== */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    let favorites =
        JSON.parse(
            localStorage.getItem("yuvaRiseFavorites")
        ) || [];


    favoriteButtons.forEach(function (button) {

        const item =
            button.dataset.item;


        if (favorites.includes(item)) {

            button.classList.add("favorited");

            button.innerHTML = "♥";

        }


        button.addEventListener("click", function () {

            if (favorites.includes(item)) {

                favorites =
                    favorites.filter(function (fav) {
                        return fav !== item;
                    });

                button.classList.remove(
                    "favorited"
                );

                button.innerHTML = "♡";

            } else {

                favorites.push(item);

                button.classList.add(
                    "favorited"
                );

                button.innerHTML = "♥";

            }


            localStorage.setItem(
                "yuvaRiseFavorites",
                JSON.stringify(favorites)
            );

        });

    });


    /* =====================================================
       12. DAILY CHALLENGE
       ===================================================== */

    const challengeButton =
        document.querySelector("#completeChallenge");


    if (challengeButton) {

        const today =
            new Date().toISOString().split("T")[0];


        const completedDate =
            localStorage.getItem(
                "yuvaRiseChallengeDate"
            );


        if (completedDate === today) {

            challengeButton.textContent =
                "✓ Completed Today";

            challengeButton.disabled =
                true;

        }


        challengeButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "yuvaRiseChallengeDate",
                    today
                );


                challengeButton.textContent =
                    "✓ Completed Today";

                challengeButton.disabled =
                    true;


                alert(
                    "Great job! You completed today's challenge."
                );

            }
        );

    }


    /* =====================================================
       13. PROGRESS TRACKING
       ===================================================== */

    const progressCheckboxes =
        document.querySelectorAll(
            ".progress-check"
        );


    function updateProgress() {

        if (progressCheckboxes.length === 0) {
            return;
        }


        let completed = 0;


        progressCheckboxes.forEach(function (checkbox) {

            if (checkbox.checked) {
                completed++;
            }

        });


        const percentage =
            Math.round(
                (completed /
                    progressCheckboxes.length) *
                100
            );


        const progressBar =
            document.querySelector(
                ".progress-bar"
            );


        const progressText =
            document.querySelector(
                ".progress-percentage"
            );


        if (progressBar) {

            progressBar.style.width =
                percentage + "%";

        }


        if (progressText) {

            progressText.textContent =
                percentage + "%";

        }


        localStorage.setItem(
            "yuvaRiseProgress",
            percentage
        );

    }


    progressCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            updateProgress
        );

    });


    /* =====================================================
       14. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.querySelector("#contactName")?.value.trim();

                const email =
                    document.querySelector("#contactEmail")?.value.trim();

                const message =
                    document.querySelector("#contactMessage")?.value.trim();


                if (!name || !email || !message) {

                    alert(
                        "Please fill all fields."
                    );

                    return;

                }


                alert(
                    "Thank you, " +
                    name +
                    "! Your message has been received."
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       15. BUTTON CLICK FEEDBACK
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.add(
                    "button-clicked"
                );


                setTimeout(function () {

                    button.classList.remove(
                        "button-clicked"
                    );

                }, 300);

            }
        );

    });


    /* =====================================================
       16. CURRENT YEAR IN FOOTER
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       17. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.querySelector("#backToTop");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       18. PREVENT EMPTY LINK JUMP
       ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       19. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});