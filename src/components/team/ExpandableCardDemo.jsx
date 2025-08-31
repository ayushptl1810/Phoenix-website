import React from "react";
import testImage from "../../assets/junior_core/test.jpg";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import test from "node:test";

export function ExpandableCardDemo({ cardType = "core" }) {
  const currentCards = cardType === "core" ? coreTeamCards : juniorCoreCards;

  if (cardType === "core") {
    const firstRowCards = currentCards.slice(0, 2);
    const secondRowCards = currentCards.slice(2, 5);
    const thirdRowCards = currentCards.slice(5, 10);
    const fourthRowCards = currentCards.slice(10, 12);

    return (
      <div className="max-w-6xl mx-auto w-full">
        {/* First row - 2 cards */}
        <div className="grid grid-cols-2 gap-4 mb-4 justify-center">
          {firstRowCards.map((card, index) => (
            <div
              key={card.title}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
              <div className="flex gap-4 flex-col w-full">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-125 w-full rounded-lg object-cover object-top" />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <h3
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base">
                    {card.title}
                  </h3>
                  <p
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base">
                    {card.description}
                  </p>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a
                      href={card.instagramLink || "https://instagram.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href={card.linkedinLink || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - 3 cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {secondRowCards.map((card, index) => (
            <div
              key={card.title}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
              <div className="flex gap-4 flex-col w-full">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-100 w-full rounded-lg object-cover object-top" />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <h3
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base">
                    {card.title}
                  </h3>
                  <p
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base">
                    {card.description}
                  </p>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a
                      href={card.instagramLink || "https://instagram.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href={card.linkedinLink || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third row - 5 cards */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {thirdRowCards.map((card, index) => (
            <div
              key={card.title}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
              <div className="flex gap-4 flex-col w-full">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-top" />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <h3
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base">
                    {card.title}
                  </h3>
                  <p
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base">
                    {card.description}
                  </p>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a
                      href={card.instagramLink || "https://instagram.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href={card.linkedinLink || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fourth row - 2 cards with same dimensions as the 5-card row */}
        <div className="grid grid-cols-5 gap-4">
          {fourthRowCards.map((card, index) => (
            <div
              key={card.title}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
              <div className="flex gap-4 flex-col w-full">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-top" />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <h3
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base">
                    {card.title}
                  </h3>
                  <p
                    className="text-neutral-600 dark:text-neutral-400 text-center text-base">
                    {card.description}
                  </p>
                  <div className="flex justify-center space-x-4 mt-3">
                    <a
                      href={card.instagramLink || "https://instagram.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href={card.linkedinLink || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default layout for junior core cards
  return (
    <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-start gap-4">
      {currentCards.map((card, index) => (
        <div
          key={card.title}
          className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl">
          <div className="flex gap-4 flex-col w-full">
            <div>
              <img
                width={100}
                height={100}
                src={card.src}
                alt={card.title}
                className="h-60 w-full rounded-lg object-cover object-top" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <h3
                className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base">
                {card.title}
              </h3>
              <p
                className="text-neutral-600 dark:text-neutral-400 text-center text-base">
                {card.description}
              </p>
              <div className="flex justify-center space-x-4 mt-3">
                <a
                  href={card.instagramLink || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href={card.linkedinLink || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}

const coreTeamCards = [
  {
    description: "Captain",
    title: "Prajwal Patil",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/prajwalpatil",
    linkedinLink: "https://linkedin.com/in/prajwalpatil",
    content: () => {
      return (
        <p>
          Alex is the visionary founder of Phoenix Drones, with over 8 years of experience in 
          aerospace engineering and autonomous systems. He leads the team with passion for 
          innovation and a commitment to pushing the boundaries of drone technology.
        </p>
      );
    },
  },
  {
    description: "Vice Captain",
    title: "Akshansh Dwivedi",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/akshanshdwivedi",
    linkedinLink: "https://linkedin.com/in/akshanshdwivedi",
    content: () => {
      return (
        <p>
          Sarah is our hardware engineering mastermind, specializing in PCB design, sensor 
          integration, and power systems optimization. With 6 years of experience in electronic 
          systems design, she ensures our drones are built with cutting-edge components.
        </p>
      );
    },
  },
  {
    description: "Team manager & Coding head",
    title: "Deevi Nandu",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/deevinandu",
    linkedinLink: "https://linkedin.com/in/deevinandu",
    content: () => {
      return (
        <p>
          Marcus leads our software development with expertise in embedded systems, computer 
          vision, and real-time processing. He architected our core flight software that powers 
          all Phoenix Drones systems.
        </p>
      );
    },
  },
  {
    description: "Research & Development Lead",
    title: "Dr. Emily Watson",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/khushiparekh",
    linkedinLink: "https://linkedin.com/in/khushiparekh",
    content: () => {
      return (
        <p>
          Dr. Watson leads our research initiatives and coordinates academic partnerships. With a 
          PhD in Robotics and 10 years of research experience, she drives innovation in autonomous 
          systems and AI applications.
        </p>
      );
    },
  },
  {
    description: "Mechanical Design Lead",
    title: "David Kim",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/davidkim",
    linkedinLink: "https://linkedin.com/in/davidkim",
    content: () => {
      return (
        <p>
          David specializes in mechanical design, aerodynamics, and materials science. His 
          innovative chassis designs have improved drone durability and performance while 
          reducing weight by 25%.
        </p>
      );
    },
  },
  {
    description: "AI & Machine Learning Lead",
    title: "Dr. Robert Kumar",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Dr. Kumar leads our AI research with expertise in machine learning, neural networks, 
          and computer vision. He developed our breakthrough autonomous navigation system that 
          has won multiple awards.
        </p>
      );
    },
  },
  {
    description: "Operations Manager",
    title: "Lisa Thompson",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Lisa manages our operations, quality assurance, and flight testing programs. She 
          ensures all our drones meet the highest standards of safety and performance before 
          deployment.
        </p>
      );
    },
  },
  {
    description: "Business Development Lead",
    title: "Maria Gonzalez",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Maria leads our business development and strategic partnerships. She has successfully 
          secured partnerships with leading aerospace companies and expanded our market reach 
          globally.
        </p>
      );
    },
  },
  {
    description: "Electronics Specialist",
    title: "James Wilson",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          James specializes in advanced electronics design and signal processing. His work on 
          communication systems has enabled long-range control and data transmission for our 
          drone fleet.
        </p>
      );
    },
  },
  {
    description: "Project Coordinator",
    title: "Anna Rodriguez",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Anna coordinates complex projects across multiple teams, ensuring timely delivery 
          and efficient resource allocation. Her organizational skills keep our ambitious 
          projects on track and within budget.
        </p>
      );
    },
  },
  {
    description: "Flight Operations Specialist",
    title: "Michael Chen",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/michaelchen",
    linkedinLink: "https://linkedin.com/in/michaelchen",
    content: () => {
      return (
        <p>
          Michael oversees flight operations and safety protocols, ensuring all drone missions 
          comply with aviation regulations. His expertise in air traffic management keeps our 
          operations running smoothly and safely.
        </p>
      );
    },
  },
  {
    description: "Quality Assurance Lead",
    title: "Sarah Johnson",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    instagramLink: "https://instagram.com/sarahjohnson",
    linkedinLink: "https://linkedin.com/in/sarahjohnson",
    content: () => {
      return (
        <p>
          Sarah leads our quality assurance team, implementing rigorous testing protocols 
          and quality standards. Her attention to detail ensures every Phoenix drone meets 
          the highest performance and reliability standards.
        </p>
      );
    },
  },
];

const juniorCoreCards = [
  {
    description: "Computer Vision Engineer",
    title: "Jennifer Park",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Jennifer specializes in computer vision algorithms and real-time image processing. 
          She has developed advanced object detection and tracking systems that enhance our 
          drones' autonomous capabilities.
        </p>
      );
    },
  },
  {
    description: "Embedded Systems Developer",
    title: "Carlos Martinez",
    src: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Carlos focuses on embedded software development and real-time systems. He optimizes 
          our flight control software for maximum performance and reliability on resource-constrained 
          hardware.
        </p>
      );
    },
  },
  {
    description: "UX/UI Designer",
    title: "Sophie Anderson",
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Sophie designs intuitive user interfaces for our ground control software and mobile 
          applications. Her user-centered design approach makes complex drone operations 
          accessible to operators of all skill levels.
        </p>
      );
    },
  },
  {
    description: "Test Engineer",
    title: "Ryan Taylor",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Ryan conducts comprehensive testing of our drone systems, from individual components 
          to complete flight tests. His meticulous approach ensures our products meet the 
          highest quality standards.
        </p>
      );
    },
  },
  {
    description: "Data Analyst",
    title: "Priya Patel",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Priya analyzes flight data and performance metrics to optimize our drone operations. 
          Her insights drive data-driven decisions that improve flight efficiency and safety.
        </p>
      );
    },
  },
  {
    description: "Sensor Integration Specialist",
    title: "Ahmed Hassan",
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Ahmed specializes in integrating various sensors into our drone platforms. His work 
          ensures seamless data fusion from multiple sensor sources for enhanced situational 
          awareness.
        </p>
      );
    },
  },
  {
    description: "Algorithm Developer",
    title: "Isabella Lopez",
    src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Isabella develops advanced algorithms for path planning, obstacle avoidance, and 
          mission optimization. Her mathematical approach to complex problems yields elegant 
          solutions for autonomous flight.
        </p>
      );
    },
  },
  {
    description: "Systems Integrator",
    title: "Jake Thompson",
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Jake ensures all subsystems work together harmoniously in our drone platforms. 
          His systems thinking approach identifies integration challenges early and develops 
          robust solutions.
        </p>
      );
    },
  },
  {
    description: "Communication Systems Engineer",
    title: "Natasha Volkov",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Natasha develops communication protocols and network architectures for drone swarms 
          and ground control systems. Her work enables coordinated multi-drone operations 
          and reliable data transmission.
          
        </p>
      );
    },
  },
  {
    description: "Flight Test Pilot",
    title: "Tom Anderson",
    src: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=500&h=500&fit=crop&crop=face",
    ctaText: "LinkedIn",
    ctaLink: "https://linkedin.com",
    content: () => {
      return (
        <p>
          Tom conducts flight tests and evaluates drone performance in various conditions. 
          His pilot experience and technical knowledge provide valuable feedback for system 
          improvements and safety enhancements.
        </p>
      );
    },
  },
];
