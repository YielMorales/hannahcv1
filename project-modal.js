document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  const projectsData = {
    1: {
      title: "Kumon Math & English Instructor",
      tags: ["Teaching", "Education", "2022–2025"],
      description:
        "Part-Time Math & English Instructor at Kumon Cavite City Center (May 2022 – July 2025). Taught Math to students from elementary to high school and English to early readers from kindergarten to elementary. Assisted students in developing independent learning and efficient study methods.",
      features: [
        "Taught Math to students from elementary to high school level",
        "Taught English to early readers from kindergarten to elementary",
        "Assisted students in developing independent learning habits",
        "Received Math & English Program Completer Plaque",
        "Ranked in Top 10 Math & English Completers in Kumon Philippines",
      ],
      technologies: [
        "Teaching",
        "Mentoring",
        "Curriculum Delivery",
        "Student Development",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    2: {
      title: "HR Intern — Eight8ate Holdings, Inc.",
      tags: ["Human Resources", "Internship", "Aug 2024"],
      description:
        "Human Resources Intern under the Senior High School Work Immersion Program at Eight8ate Holdings, Inc. in Taguig City. Assisted with core HR functions and supported a major fundraising event.",
      features: [
        "Processed employee overtime, timekeeping, and payroll support",
        "Organized and maintained employee records and HR-related files",
        "Supported coordination of the Pawssion FunRun fundraising event",
        "Collaborated with Eight8ate and Pawssion teams on event logistics",
      ],
      technologies: [
        "HR Operations",
        "Payroll Support",
        "Record Management",
        "Event Coordination",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    3: {
      title: "A.R.I: SHS Business Pitch Competition",
      tags: ["Event Management", "Logistics", "Nov 2024–Feb 2025"],
      description:
        "Adparo, Rego, Iuvo (A.R.I) SHS Business Pitch Competition at Enderun Colleges, Inc. Served as Logistics Head overseeing planning, operations, and on-site coordination for the full duration of the competition.",
      features: [
        "Oversaw planning, logistics, and on-site operations for all ARI events",
        "Coordinated with Security services, MIS, and venue staff",
        "Ensured smooth execution across all competition stages",
        "Facilitated student engagement and participation throughout",
        "Supported the event's overall flow and audience experience",
        "Received the A.R.I Leadership Award",
      ],
      technologies: [
        "Event Planning",
        "Logistics",
        "Stakeholder Coordination",
        "Leadership",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    4: {
      title: "Enderun LIKHA: Enderun's Got Talent 2025",
      tags: ["Executive Director", "Event Production", "Jan–Apr 2025"],
      description:
        "Spearheaded the planning and execution of Enderun LIKHA: Enderun's Got Talent 2025 at Enderun Colleges, Inc. as Executive Director. Led a campus-wide talent competition serving SHS students, college students, and external guests.",
      features: [
        "Spearheaded full planning and execution of the campus-wide talent competition",
        "Coordinated logistics, scheduling, and event flow end-to-end",
        "Collaborated with several departments and external sponsors",
        "Secured resources and managed live performances",
        "Oversaw marketing, promotions, and participant management",
        "Ensured high engagement and a professionally run event",
      ],
      technologies: [
        "Event Production",
        "Marketing",
        "Sponsorship",
        "Team Leadership",
        "Project Management",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
  };

  projectCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const project = projectsData[this.getAttribute("data-project")];
      if (project) showProject(project);
    });
  });

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  function showProject(p) {
    modal.querySelector(".modal-title").textContent = p.title;
    modal.querySelector(".modal-description").textContent = p.description;
    const img = modal.querySelector(".modal-image img");
    img.src = p.image;
    img.alt = p.title;

    const tags = modal.querySelector(".modal-tags");
    tags.innerHTML = "";
    p.tags.forEach((t) => {
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      tags.appendChild(s);
    });

    const feats = modal.querySelector(".modal-features");
    feats.innerHTML = "";
    p.features.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      feats.appendChild(li);
    });

    const tech = modal.querySelector(".modal-tech");
    tech.innerHTML = "";
    p.technologies.forEach((t) => {
      const s = document.createElement("span");
      s.className = "tech-badge";
      s.textContent = t;
      tech.appendChild(s);
    });

    modal.querySelector(".btn-github").href = p.github || "#";
    modal.querySelector(".btn-demo").href = p.demo || "#";
    openModal();
  }

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
