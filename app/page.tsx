import dynamic from "next/dynamic";
import {
  getProfileSSR,
  getProjectsSSR,
  getSkillsSSR,
  getExperiencesSSR,
} from "@/lib/fetch-ssr";
import ClientShell from "@/components/sections/ClientShell";
import GlobalBackground from "@/components/sections/GlobalBackground";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import Marquee from "@/components/sections/Marquee";
import SkillsSection from "@/components/sections/SkillsSection";
import Footer from "@/components/sections/Footer";

// Dynamic imports for sections below the fold to improve LCP and initial bundle size
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  {
    ssr: true,
    loading: () => <div style={{ minHeight: "400px" }} />,
  },
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection"),
  {
    ssr: true,
    loading: () => <div style={{ minHeight: "400px" }} />,
  },
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  {
    ssr: true,
    loading: () => <div style={{ minHeight: "400px" }} />,
  },
);

export default async function PortfolioPage() {
  // Fetch data on the server
  const [profile, projects, skills, experiences] = await Promise.all([
    getProfileSSR(),
    getProjectsSSR(),
    getSkillsSSR(),
    getExperiencesSSR(),
  ]);

  // Group skills by category for the SkillsSection
  const groupedSkills = skills.reduce((acc: any, s: any) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <ClientShell>
      <GlobalBackground />

      <div
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Navbar profile={profile} loading={false} />

        <main>
          <HeroSection profile={profile} loading={false} />

          <Marquee />

          <SkillsSection groupedSkills={groupedSkills} loading={false} />

          <ProjectsSection projects={projects} loading={false} />

          <ExperienceSection experiences={experiences} loading={false} />

          <ContactSection profile={profile} loading={false} />

          <Footer profile={profile} />
        </main>
      </div>
    </ClientShell>
  );
}
