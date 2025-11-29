import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-info-cc',
  imports: [CommonModule],
  templateUrl: './info-cc.component.html',
  styleUrl: './info-cc.component.scss',
})
export class InfoCcComponent {
  langOpen = false;
  isMenuOpen = false;
  activeSection = 'about';
  isPlaying = false;

  langs = [
    {
      code: 'vi',
      short: 'VIE',
      label: 'Vietnamese',
      flag: 'assets/images/Social/Flag_of_Vietnam.svg.png',
    },
    {
      code: 'en',
      short: 'ENG',
      label: 'English',
      flag: 'assets/images/Social/UK-Logo.png',
    },
  ];
  currentLang = this.langs[0];

  skills = [
    // 🧠 Backend
    { name: 'C#', src: 'assets/images/BE/CSharp.png' },
    { name: '.NET Core', src: 'assets/images/BE/dotnet.png' },
    { name: 'Python', src: 'assets/images/BE/python.png' },
    { name: 'RabbitMQ', src: 'assets/images/BE/rabbitmq.png' },
    { name: 'Kafka', src: 'assets/images/BE/kafka.png' },

    // 🎨 Frontend
    { name: 'HTML5', src: 'assets/images/FE/html5.png' },
    { name: 'CSS3', src: 'assets/images/FE/css3.png' },
    { name: 'JavaScript', src: 'assets/images/FE/js.png' },
    { name: 'Angular', src: 'assets/images/FE/angular.png' },
    { name: 'Git', src: 'assets/images/FE/git.png' },

    // 🗄️ Database & Cloud
    { name: 'SQL Server', src: 'assets/images/SQL/sqlserver.png' },
    { name: 'Oracle', src: 'assets/images/SQL/oracle.png' },
    { name: 'MongoDB', src: 'assets/images/SQL/mongo.png' },
    { name: 'Redis', src: 'assets/images/SQL/redis.png' },
    // { name: 'Google Cloud', src: 'assets/images/SQL/gcp.png' },
    { name: 'Docker', src: 'assets/images/SQL/docker.webp' },
  ];

  socials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/lxmc29',
      icon: 'assets/images/Social/Facebook_Logo_(2019).png',
    },
    {
      label: 'Instagram',
      href: 'https://https://www.instagram.com/chiencone',
      icon: 'assets/images/Social/bieu-tuong-instagram_768467-672.png',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/minh-chi%E1%BA%BFn-l%C3%AA-xu%C3%A2n-645418360',
      icon: 'assets/images/Social/LinkedIn_icon.svg.png',
    },
    {
      label: 'Zalo',
      href: 'https://zalo.me/',
      icon: 'assets/images/Social/Logo-zalo-png.png',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/',
      icon: 'assets/images/Social/Telegram_alternative_logo.svg.png',
    },
  ];

  sections = [
    { id: 'about', label: 'About' },
    { id: 'skill', label: 'Skill' },
    { id: 'experience', label: 'Experience' },
    { id: 'social', label: 'Social' },
    { id: 'contact', label: 'Contact' },
  ];

  experiences = [
    {
      company: 'FSEL Company',
      date: '12/2023 - 09/2025',
      client: 'Five Star E-Learing',
      description: 'E-Learning software development',
      role: 'BackEnd Developer',
      teamSize: '5',
      function:
        'Designed solutions for tasks, built and optimized backend APIs and database queries|Handled background jobs and message queues|Wrote complex Stored Procedures|Handling Excel import and export|Processing audio data with Ffmpeg|Integrated with ChatGPT, Deepgram, Azure services, Google',
      language:
        '.NET Core, Python, Fsel Core, Worker Services, MassTransit, RabbitMQ, SQL Server, SignalR, WebSocket, OneSignal, Ffmpeg',
    },
    {
      company: 'FSEL Company',
      date: '03/2024 - 09/2024',
      client: 'Atlantic Group',
      description:
        'Developing human resource and time attendance management software',
      role: 'Backend Developer',
      teamSize: '5',
      function:
        'Collaborated with BA to analyze requirements and contribute ideas|Built and managed the database|Designed solutions, developed services and backend APIs|Handled background jobs and queues|Integrated real-time notifications with SignalR/WebSocket and OneSignal|Assisted in task handling, bug fixing, and team training',
      language:
        '.NET Core, Worker Services, MassTransit, RabbitMQ, SQL Server, SignalR, WebSocket, OneSignal',
    },
    {
      company: 'FSEL Company',
      date: '10/2024 - 02/2025',
      client: 'Schoolink Japan/Korea',
      description:
        'Developing an LMS to manage classes, students, and lectures',
      role: 'Backend Developer',
      teamSize: '3',
      function:
        'Designed and optimized backend APIs|Built database and service solutions|Supported team members in tasks, bug fixing, and training',
      language:
        '.NET Core, Worker Services, MassTransit, RabbitMQ, SQL Server, SignalR, WebSocket, OneSignal',
    },
    {
      company: 'Synodus Company',
      date: '09/2025 - Present',
      client: 'DBV Insurance',
      description:
        'Development of an insurance contract and claims management platform',
      role: 'Fullstack Developer',
      teamSize: '8',
      function:
        'Developed both frontend and backend modules for insurance contract and claims management|Built internal tools to support system data processing and maintenance|Implemented stored procedures and validation logic for contract entry and claims workflows across multiple insurance products.',
      language: '.NET Core, Dapper, Angular, Kafka, MongoDB, Oracle',
    },
  ];

  toggleLang() {
    this.langOpen = !this.langOpen;
  }
  setLang(l: any) {
    this.currentLang = l;
    this.langOpen = false; /* TODO: i18n switch */
  }
  closeLang() {
    this.langOpen = false;
  }

  @HostListener('window:click') onWinClick() {
    this.langOpen = false;
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.scrollY + 150; // offset cho đẹp, tránh che bởi navbar

    for (const sec of this.sections) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          this.activeSection = sec.id;
          break;
        }
      }
    }
  }

  toggleMusic() {
    this.isPlaying = !this.isPlaying;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
