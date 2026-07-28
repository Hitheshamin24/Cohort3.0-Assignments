import React from "react";

const team = [
  {
    initials: "A",
    name: "Aryan Shah",
    role: "Founder & CEO",
    bg: "bg-lime-400",
    text: "text-black",
  },
  {
    initials: "P",
    name: "Priya Mehta",
    role: "Head of Product",
    bg: "bg-blue-500",
    text: "text-white",
  },
  {
    initials: "R",
    name: "Rohan Verma",
    role: "Lead Engineer",
    bg: "bg-violet-500",
    text: "text-white",
  },
  {
    initials: "S",
    name: "Sneha Kapoor",
    role: "Design Director",
    bg: "bg-rose-500",
    text: "text-white",
  },
];

const TeamSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      <h2 className="font-syne text-[24px] font-bold text-center text-white mb-10">
        Meet the Team
      </h2>

      <div className="grid  grid-cols-4  gap-5">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-[#101010] border border-zinc-200 rounded-[22px] py-8 px-6 flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:border-lime-400"
          >
            {/* Avatar */}
            <div
              className={`w-12 h-12 rounded-2xl ${member.bg} flex items-center justify-center`}
            >
              <span
                className={`font-syne text-[20px] font-bold ${member.text}`}
              >
                {member.initials}
              </span>
            </div>

            {/* Name */}
            <h3 className="mt-5 font-dm-sans text-[14px] font-semibold text-white text-center">
              {member.name}
            </h3>

            {/* Role */}
            <p className="mt-1 font-dm-sans text-[12px] text-zinc-500 text-center">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;