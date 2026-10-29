/* ==========================================================================
   AINISH SINGH - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('ainish_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ainish_portfolio_theme', nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // 4. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'ainishsingh@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast(`Copy failed, email: ${email}`);
      });
    });
  }

  // 5. Toast Notification System
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message, duration = 3000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 6. Interactive Developer Terminal Playground
  const terminalInput = document.getElementById('terminalInput');
  const terminalSubmit = document.getElementById('terminalSubmit');
  const terminalBody = document.getElementById('terminalBody');
  const chips = document.querySelectorAll('.term-chip');

  const COMMAND_RESPONSES = {
    help: `Available commands:
  • about       : Overview of Ainish Singh
  • skills      : Technical competencies & languages
  • robotics    : NewtonBotics club activities & hardware work
  • hackathon   : Scratch-a-thon participation details
  • education   : Rishihood University & St. Paul's School
  • contact     : Ways to connect & social channels
  • clear       : Clears terminal screen`,

    about: `Ainish Singh — 1st Year B.Tech Computer Science & Artificial Intelligence student at Rishihood University (Newton School of Technology). Driven by curiosity, eager to learn and build real-world software and autonomous robotics.`,

    skills: `Technical Core:
  • Languages   : Python (Algorithmic problem solving, scripting, OOP), SQL (Relational database queries & modeling)
  • Domain      : Artificial Intelligence Foundations, Robotics & Microcontrollers
  • Tools       : Git, GitHub, VS Code
  • Mindset     : Eager to learn, prototype, and build`,

    robotics: `NewtonBotics (NST Robotics Club):
  • Active club member working on sensor integration, microcontroller hardware logic, and autonomous mechanical systems.
  • Focused on fusing software algorithms with real-world physical machines.`,

    hackathon: `Scratch-a-thon:
  • Competed in university-level Scratch-a-thon hackathon challenge.
  • Built rapid software prototypes under tight time limits, focusing on team collaboration and creative problem solving.`,

    education: `Academic Background:
  • B.Tech CS & AI (1st Year) : Rishihood University x Newton School of Technology (2026-Present)
  • Class 12th Board Exam    : St. Paul's School, Chhibramau, Kannauj (2026 | 84%)
  • Class 10th Board Exam    : St. Paul's School, Chhibramau, Kannauj (2024 | 86%)
  • Schooling (Classes 1-12) : St. Paul's School, Chhibramau`,

    contact: `Contact Ainish:
  • Location : Rishihood University (NST) / Kannauj, UP
  • GitHub   : github.com (Add your link)
  • LinkedIn : linkedin.com (Add your link)
  • Email    : Use the form below or copy via the button above!`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo command
    appendTerminalLine(`ainish@portfolio:~$ ${rawCmd}`, 'cmd-echo');

    if (cmd === 'clear') {
      if (terminalBody) {
        terminalBody.innerHTML = '';
      }
      return;
    }

    if (COMMAND_RESPONSES[cmd]) {
      appendTerminalLine(COMMAND_RESPONSES[cmd], 'cmd-output');
    } else {
      appendTerminalLine(`command not found: '${rawCmd}'. Type 'help' for available commands.`, 'cmd-error');
    }

    // Auto-scroll to bottom of terminal
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function appendTerminalLine(text, className) {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${className || ''}`;
    line.innerText = text;
    terminalBody.appendChild(line);
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  }

  if (terminalSubmit && terminalInput) {
    terminalSubmit.addEventListener('click', () => {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
      terminalInput.focus();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('nameInput');
      const senderName = nameInput ? nameInput.value : 'Friend';
      showToast(`Thank you, ${senderName}! Your message was recorded.`);
      contactForm.reset();
    });
  }
});

