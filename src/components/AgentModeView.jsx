import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MARKDOWN_CONTENT = `# Saurav Pratihasta
/'sɔː.rʌb/prə.tiː.hʌs.tə/ • noun • {{TIME}}

## About

A full-stack developer and [product builder](https://en.wikipedia.org/wiki/Product_design) with deep experience across engineering, product strategy, and user-centric design.

A [polymath](https://en.wikipedia.org/wiki/Polymath) who bridges technical architecture with business outcomes to create impactful, scalable solutions.

---

## Experience

### TCS (Tata Consultancy Services)
**Software Engineer, Noida, IN
*September 2024 - Present*

As an early software engineer bridging product strategy and technical execution, I am driving the development of an AI-native messaging platform from zero to one.

Key focus areas include:
- Architecting and building core product features for an AI-focused messaging ecosystem.
- Developing real-time systems and innovating ways to transform and present information dynamically within messaging interfaces.
- Collaborating within a lean team to build robust tools for AI-driven communication.
- Operating top-to-bottom, from product conception to complete software development.

## ConsultAdd
**Automation & Cloud Engineer, Pune, IN**
*July 2023 - August 2024*
As a Automation & Cloud Engineer at ConsultAdd, I was immersed in designing and developing cutting-edge Agentic AI systems.

Built autonomous, goal-driven AI agents that shifted from suggestion-based tools to proactive execution, enabling seamless human-AI collaboration and redefining task automation and decision-making.

Drove a bold vision for the future of computing: making traditional web browsing obsolete, turning personal data into the primary interface, and empowering agentic systems to independently handle complex responsibilities.

Operated in a high-intensity environment surrounded by world-class cofounders, mentors, and resources, to explore, validate, and iterate on ideas at pace.

Positioned at the forefront of a paradigm shift in AI, tackling hard technical and conceptual challenges to create meaningful, scalable impact in the emerging agentic era.


Designed and developed a comprehensive system for managing Access Control List (ACL) permissions across multiple Linux file system servers, including NFS and BeeGFS, demonstrating expertise in large-scale distributed systems and secure file management.

Built a robust backend capable of processing millions of permission change requests, showcasing proficiency in high-performance computing and scalability.

Implemented two Linux systemd daemons communicating via Unix sockets: one for gRPC-based backend interactions and another for executing ACL changes, highlighting skills in daemon development, inter-process communication, and system-level programming.

Created a user-friendly Next.js frontend enabling secure login, backend communication, and scheduling of permission requests, illustrating full-stack development capabilities and focus on intuitive user experiences.



## In Between These Experiences

### The Product Building Journey

I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.

It started with **Imgwiper** during my sophomore year, a tool that cleaned image metadata. No one would use it, but I was proud. It was my first real attempt at shipping something complete.

Next came **Storic**, a news app where I spent months doing serious infrastructure work. This was where I learned to build systems that could scale, not just features that looked good.

---

## Education

### KIET Group of Institutions
**B.Tech in Electronics and Communication Engineering**
*2020 - 2024*

---

---

## Tech Stack

Next.js, Go, Python, Hugging Face, TypeScript, React, Tailwind CSS, GitHub, Git, Docker, PostgreSQL, FastAPI, MongoDB, Shadcn UI, Redis, Vercel

---

## Explainer Videos

Here is how I explain complex systems on my [YouTube Channel](https://www.youtube.com/@theracecondition)

Featured Video: [https://www.youtube.com/embed/m84tBP_4DWE](https://www.youtube.com/embed/m84tBP_4DWE)

---

---

## Library

### Dev
- **Linux Kernel Development** by Robert Love
- **Hacking: The Art of Exploitation** by Jon Erickson
- **Linux in a Nutshell** by Ellen Siever, Stephen Figgins, Robert Love, and Arnold Robbins
- **Linux Kernel in a Nutshell** by Greg Kroah-Hartman
- **The Art of Electronics** by Paul Horowitz and Winfield Hill
- **Nmap Cookbook** by Nicholas Marsh

### Casual Reads
- **Hooked: How to Build Habit-Forming Products** by Nir Eyal
- **The Lean Startup** by Eric Ries
- **Zero to One** by Peter Thiel
- **The Almanack of Naval Ravikant** by Eric Jorgenson
- **Deep Work** by Cal Newport
- **The Anthology of Balaji Srinivasan** by Eric Jorgenson

*and many more, these are just one of my best reads

---

## Thing About Me

Beyond engineering and build systems, I find balance in the tactile and the thoughtful. Whether it's exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.

I believe that the best products are built by people who have a diverse range of interests. It's the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.

---

## Get in Touch

Connect with me on [LinkedIn](https://https://www.linkedin.com/in/saurav-pratihast/) or shoot an [email](mailto:spratihast9@gmail.com)

---

**Links:**
- GitHub: [https://github.com/saurav220](https://github.com/saurav220)
- LinkedIn: [https://https://www.linkedin.com/in/saurav-pratihast/](https://https://www.linkedin.com/in/saurav-pratihast/)
- Twitter: [https://x.com/PratihastSaurav](https://x.com/PratihastSaurav)
- Discord: haven't made one
- Calendar: [https://cal.com/saurav-pratihast/30min](https://cal.com/saurav-pratihast/30min)`;

export default function AgentModeView() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const content = MARKDOWN_CONTENT.replace("{{TIME}}", time);

  return (
    <motion.div
      className="agent-raw-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <pre>{content}</pre>
    </motion.div>
  );
}
