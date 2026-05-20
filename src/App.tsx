import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, ExternalLink, Code, Database, Wrench, User, GraduationCap, Sun, Moon } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof formValues, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const validateForm = (values: typeof formValues) => {
    const errors: Partial<Record<keyof typeof formValues, string>> = {};
    const trimmed = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim()
    };
    const emailPattern = /^\S+@\S+\.\S+$/;

    if (!trimmed.name) {
      errors.name = 'Name is required.';
    }
    if (!trimmed.email) {
      errors.email = 'Email is required.';
    } else if (!emailPattern.test(trimmed.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!trimmed.subject) {
      errors.subject = 'Subject is required.';
    }
    if (!trimmed.message) {
      errors.message = 'Message is required.';
    }

    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name as keyof typeof formValues]) {
        return prev;
      }
      const next = { ...prev };
      delete next[name as keyof typeof formValues];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm(formValues);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors below and try again.');
      return;
    }

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!formspreeEndpoint) {
      setSubmitStatus('error');
      setSubmitMessage('Message service is not configured yet. Please try again later.');
      return;
    }

    setSubmitStatus('sending');
    setSubmitMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          subject: formValues.subject.trim(),
          message: formValues.message.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setSubmitMessage('Thanks! Your message has been sent.');
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFieldErrors({});
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, something went wrong. Please try again in a moment.');
    }
  };

  const skills = {
    programming: ['Java', 'Python', 'Kotlin', 'R', 'MERN', 'JavaScript', 'PHP', 'HTML', 'CSS'],
    databases: ['MySQL', 'MongoDB'],
    tools: ['GitHub', 'Figma', 'VS Code', 'Android Studio', 'Eclipse', 'Apache Tomcat']
  };

  const projects = [
    {
      title: "🌴 Coconut-Based Product Management System",
      description: "Coconut-based products management platform developed with the MERN stack. My primary function was Customer Relationship and Feedback Management, where I implemented CRUD operations for customer feedbacks to engagement between customers and the business. Features include adding, viewing, updating, and deleting customer feedbacks, along with plans to enhance date tracking for updates and search functionality. Tools & Tehnologies : Node.js, Express.js, React.js, and MongoDB ",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "VS Code"],
      timeline: "Feb 2025 – Jun 2025",
      team: "5 Members",
      github: "https://github.com/nwijesooirya/CocoHubWebApp",
      image: "https://images.pexels.com/photos/1045113/pexels-photo-1045113.jpeg"
    },
    {
      title: "📊 Online Stock Management System", 
      description: "A web-based application developed with Java Servlets and MySQL, focused on customer registration and user profile management. Core features include user signup, login authentication, and profile handling with fields such as full name, DOB, gender, and etc. Emphasis was placed on secure registration, validation, and clean UI design. Tools & Technologies : Java Servlets, MySQL, Apache Tomcat, Eclipse IDE.",
      technologies: ["Java", "MySQL", "Apache Tomcat", "Eclipse IDE"],
      timeline: "Jul 2024 – Nov 2024",
      team: "4 Members",
      github: "https://github.com/nwijesooirya/UserProfileWebApp",
      image: "https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "💰 Android Mobile App 'SmartSpender'",
      description: "A mobile finance management app named SmartSpender, built with Kotlin, designed for tracking daily expenses and incomes. Focused on implementing Room Database for reliable data storage, adding budget alerts and daily reminder notifications, and developing full CRUD operations for transactions. Tools & Technologies : Kotlin, Room (SQLite), Android Studio.",
      technologies: ["Android Studio", "Java", "Kotlin"],
      timeline: "Feb 2025 – Jun 2025",
      team: "Individual Project",
      github: "https://github.com/nwijesooirya/SmartSpenderMobileApp",
      image: "https://images.pexels.com/photos/2068664/pexels-photo-2068664.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "📱 Android Mobile App 'HomeEase'",
      description: "HomeEase, A mobile application developed to connect users with home service professionals using Kotlin. Features include user registration, service browsing, appointment booking, secure messaging, and service reminders, providing a convenient and reliable home service experience. Tools & Technologies : Kotlin, XML, Android Studio.",
      technologies: ["Android Studio", "Java", "Kotlin"],
      timeline: "Feb 2025 – Jun 2025",
      team: "Individual Project",
      github: "https://github.com/nwijesooirya/HomeEase",
      image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800"
    }, 
    {
      title: "🏋️‍♂️ Online Fitness Management System",
      description: "A web-based application built to connect gym owners, fitness coaches, nutritionists, and users through a single platform. The system allows user registration, progress tracking, and access to personalized fitness services. Key features include structured workout plans, coach–user interaction, and admin management for accounts and system content. Tools & Technologies : HTML, CSS, JavaScript, MySQL, XAMPP, PHP.",
      technologies: ["HTML", "CSS", "PHP", "JavaScript", "XAMPP"],
      timeline: "Feb 2024 – Jun 2024", 
      team: "5 Members",
      github: "https://github.com/nwijesoorya",
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    navBg: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    navBorder: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    sectionBg: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputText: isDarkMode ? 'text-white' : 'text-gray-900'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${themeClasses.navBg} ${themeClasses.navBorder}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-xl font-bold ${themeClasses.text}`}>Navod Wijesooriya</div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <a href="#home" className={`${themeClasses.textSecondary} hover:text-blue-500 transition-colors duration-200`}>Home</a>
                <a href="#projects" className={`${themeClasses.textSecondary} hover:text-purple-500 transition-colors duration-200`}>Projects</a>
                <a href="#skills" className={`${themeClasses.textSecondary} hover:text-teal-500 transition-colors duration-200`}>Skills</a>
                <a href="#about" className={`${themeClasses.textSecondary} hover:text-orange-500 transition-colors duration-200`}>About</a>
                <a href="#contact" className={`${themeClasses.textSecondary} hover:text-pink-500 transition-colors duration-200`}>Contact</a>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${themeClasses.cardBg} ${themeClasses.cardBorder} border hover:scale-110 hover:shadow-lg`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-12">
              <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform duration-300">
                <img 
                  src="/Navod Wijesooriya.png" 
                  alt="Navod Wijesooriya"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className={`text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent`}>
                Navod Wijesooriya
              </h1>
            
              <h2 className="text-2xl sm:text-3xl font-semibold mb-8 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                IT Undergraduate
              </h2>
              <p className={`text-lg ${themeClasses.textSecondary} max-w-4xl mx-auto mb-10 leading-relaxed text-justify`}>
                Motivated and adaptable undergraduate student with a strong foundation in programming, 
                software development, and problem-solving. Passionate about building real-world applications, 
                learning modern technologies, and contributing to impactful projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="#contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold text-lg"
                >
                  Get In Touch
                </a>
                <a 
                  href="/Navod_Wijesooriya_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-teal-500 text-teal-500 px-10 py-4 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold text-lg"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.sectionBg}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent`}>About Me</h2>
            <p className={`text-xl ${themeClasses.textSecondary}`}>🙋‍♂️ Get to know more about my background and journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className={`${themeClasses.textSecondary} text-lg font-medium`}>Panadura, Sri Lanka</span>
              </div>
              
              <p className={`${themeClasses.textSecondary} text-lg leading-relaxed text-justify`}>
                I am dedicated and motivated undergraduate student pursuing a degree in Information technology, Sri Lanka Institute of Information Technology(SLIIT). Passionate about problem-solving, software development, and innovation, with a strong interest in technology and data management. Equipped with excellent soft skills, including communication, teamwork, adaptability, and critical thinking. Seeking opportunities to apply my knowledge, gain hands-on experience, and contribute to dynamic projects in the tech industry.

              </p>
              
              <p className={`${themeClasses.textSecondary} text-lg leading-relaxed text-justify`}>
                I specialize in full-stack development, with expertise in modern frameworks like React, Node.js, and Java. I'm constantly learning new technologies and staying up-to-date with industry trends to deliver cutting-edge solutions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="p-2 bg-gradient-to-r from-teal-500 to-green-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${themeClasses.text} text-lg mb-1`}>Current Education</h4>
                    <p className={`${themeClasses.textSecondary}`}>B.Sc. (Hons.) Information Technology - SLIIT (2023-Present)</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${themeClasses.text} text-lg mb-1`}>Experience</h4>
                    <p className={`${themeClasses.textSecondary}`}>IT Technician Intern - Ministry of Defence, Sri Lanka (2022)</p>
                    <p className={`${themeClasses.textSecondary}`}>Software Developer Intern - SLTMobitel (2026)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} rounded-2xl p-10 border ${themeClasses.cardBorder} shadow-xl hover:shadow-2xl transition-all duration-300`}>
  <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
    Core Strengths
  </h3>
  <ul className="space-y-5">
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Quick Learning & Adaptability</span>
    </li>
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Strong Problem-Solving Skills</span>
    </li>
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Team Collaboration</span>
    </li>
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Agile/Scrum Knowledge</span>
    </li>
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Time Management</span>
    </li>
    <li className="flex items-center group">
      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full mr-5 group-hover:scale-125 transition-transform duration-300"></div>
      <span className={`${themeClasses.textSecondary} text-lg`}>Continuous Self-Improvement</span>
    </li>
  </ul>
</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>Featured Projects</h2>
            <p className={`text-xl ${themeClasses.textSecondary}`}>A collection of my recent work and contributions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`${themeClasses.cardBg} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border ${themeClasses.cardBorder} overflow-hidden group`}
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-2xl font-bold ${themeClasses.text}`}>{project.title}</h3>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${themeClasses.textSecondary} hover:text-blue-500 transition-colors duration-200 hover:scale-110 transform`}
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-sm text-blue-400 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30 font-medium">{project.timeline}</span>
                    <span className="text-sm text-teal-400 bg-teal-500/20 px-4 py-2 rounded-full border border-teal-500/30 font-medium">{project.team}</span>
                  </div>
                  
                  <p className={`${themeClasses.textSecondary} mb-8 leading-relaxed text-justify text-lg`}>{project.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`text-sm ${themeClasses.cardBg} ${themeClasses.textSecondary} px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-200 border ${themeClasses.cardBorder} hover:border-purple-500/50 cursor-default`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent`}>Technical Skills</h2>
            <p className={`text-xl ${themeClasses.textSecondary}`}>Technologies & tools I familier with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border ${themeClasses.cardBorder} hover:border-blue-500/50 group`}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Programming</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.programming.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 px-5 py-3 rounded-xl text-sm font-semibold hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 cursor-default border border-blue-500/30 hover:border-blue-400/50 hover:scale-105 transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border ${themeClasses.cardBorder} hover:border-teal-500/50 group`}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Databases</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.databases.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-teal-500/20 to-green-500/20 text-teal-400 px-5 py-3 rounded-xl text-sm font-semibold hover:from-teal-500/30 hover:to-green-500/30 transition-all duration-200 cursor-default border border-teal-500/30 hover:border-teal-400/50 hover:scale-105 transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border ${themeClasses.cardBorder} hover:border-orange-500/50 group`}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Tools</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.tools.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-5 py-3 rounded-xl text-sm font-semibold hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-200 cursor-default border border-orange-500/30 hover:border-orange-400/50 hover:scale-105 transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${isDarkMode ? 'from-gray-900 via-blue-900/20 to-purple-900/20' : 'from-gray-50 via-blue-50 to-purple-50'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>Let's Connect</h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-16`}>Ready to collaborate or discuss opportunities</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=navodwijesooriya54@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${themeClasses.cardBg}/80 backdrop-blur-md rounded-2xl p-8 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 transform hover:scale-105 border ${themeClasses.cardBorder} hover:border-blue-500/50 shadow-lg hover:shadow-xl group`}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className={`${themeClasses.text} font-semibold mb-3 text-lg`}>Email</h3>
              <p className={`${themeClasses.textSecondary} text-sm break-all`}>navodwijesooriya54@gmail.com</p>
            </a>
            
            <a 
              href="tel:+94785199991"
              className={`${themeClasses.cardBg}/80 backdrop-blur-md rounded-2xl p-8 hover:bg-gradient-to-br hover:from-teal-500/10 hover:to-green-500/10 transition-all duration-300 transform hover:scale-105 border ${themeClasses.cardBorder} hover:border-teal-500/50 shadow-lg hover:shadow-xl group`}
            >
              <div className="p-3 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className={`${themeClasses.text} font-semibold mb-3 text-lg`}>Phone</h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>+94 785 199 991</p>
            </a>
            
            <a 
              href="https://github.com/nwijesooriya"
              target="_blank"
              rel="noopener noreferrer"
              className={`${themeClasses.cardBg}/80 backdrop-blur-md rounded-2xl p-8 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 transform hover:scale-105 border ${themeClasses.cardBorder} hover:border-purple-500/50 shadow-lg hover:shadow-xl group`}
            >
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className={`${themeClasses.text} font-semibold mb-3 text-lg`}>GitHub</h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>nwijesooriya</p>
            </a>
            
            <a 
              href="https://linkedin.com/in/navod-wijesooriya-8557772ba"
              target="_blank"
              rel="noopener noreferrer"
              className={`${themeClasses.cardBg}/80 backdrop-blur-md rounded-2xl p-8 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-teal-500/10 transition-all duration-300 transform hover:scale-105 border ${themeClasses.cardBorder} hover:border-blue-500/50 shadow-lg hover:shadow-xl group`}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h3 className={`${themeClasses.text} font-semibold mb-3 text-lg`}>LinkedIn</h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>Navod Wijesooriya</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className={`${themeClasses.cardBg} rounded-2xl p-10 shadow-xl border ${themeClasses.cardBorder} max-w-2xl mx-auto`}>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8`}>📝 Drop me a message</h3>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formValues.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-6 py-4 rounded-xl ${themeClasses.inputBg} ${themeClasses.inputText} border ${themeClasses.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg`}
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-red-400 text-left">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-6 py-4 rounded-xl ${themeClasses.inputBg} ${themeClasses.inputText} border ${themeClasses.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg`}
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="mt-2 text-sm text-red-400 text-left">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="sr-only">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.subject)}
                  aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                  className={`w-full px-6 py-4 rounded-xl ${themeClasses.inputBg} ${themeClasses.inputText} border ${themeClasses.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg`}
                />
                {fieldErrors.subject && (
                  <p id="contact-subject-error" className="mt-2 text-sm text-red-400 text-left">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Your message..."
                  value={formValues.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  className={`w-full px-6 py-4 rounded-xl ${themeClasses.inputBg} ${themeClasses.inputText} border ${themeClasses.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none text-lg`}
                ></textarea>
                {fieldErrors.message && (
                  <p id="contact-message-error" className="mt-2 text-sm text-red-400 text-left">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              {submitMessage && (
                <div
                  className={`text-sm text-left ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}
                  role="status"
                  aria-live="polite"
                >
                  {submitMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.bg} py-12 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.cardBorder}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`${themeClasses.textSecondary} text-lg`}>
            © {new Date().getFullYear()} Navod Wijesooriya. All rights reserved.
          </p>
          <p className={`${themeClasses.textSecondary} text-sm mt-3`}>
            Built with React & Tailwind CSS ❤
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;