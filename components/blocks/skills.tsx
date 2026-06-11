"use client";
import { motion } from "framer-motion";
import { Brain, BarChart2, SlidersHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StackItem = {
  name: string;
  category: string;
  badge: string;
  url: string;
  icon?: string;
  iconNode?: React.ReactNode;
  className?: string;
};

const stack: StackItem[] = [
  {
    name: "Python",
    category: "core language",
    icon: "https://cdn.simpleicons.org/python",
    badge: "data & ml",
    url: "https://www.python.org/",
  },
  {
    name: "LightGBM",
    category: "gradient boosting",
    iconNode: <Brain className="h-7 w-7 text-green-500" />,
    badge: "best model",
    url: "https://lightgbm.readthedocs.io/",
  },
  {
    name: "SHAP",
    category: "explainability",
    iconNode: <BarChart2 className="h-7 w-7 text-violet-500" />,
    badge: "interpretable",
    url: "https://shap.readthedocs.io/",
  },
  {
    name: "Optuna",
    category: "hyperparameter tuning",
    iconNode: <SlidersHorizontal className="h-7 w-7 text-blue-400" />,
    badge: "tuning",
    url: "https://optuna.org/",
  },
  {
    name: "FastAPI",
    category: "inference api",
    icon: "https://cdn.simpleicons.org/fastapi",
    badge: "backend",
    url: "https://fastapi.tiangolo.com/",
  },
  {
    name: "Next.js",
    category: "full stack framework",
    iconNode: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ fill: "hsl(var(--foreground))" }}>
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
      </svg>
    ),
    badge: "frontend",
    url: "https://nextjs.org/",
  },
  {
    name: "Tailwind CSS",
    category: "css framework",
    icon: "https://cdn.simpleicons.org/tailwindcss",
    badge: "styling",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Hugging Face",
    category: "model hosting",
    icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    badge: "api deploy",
    url: "https://huggingface.co/",
  },
  {
    name: "Vercel",
    category: "frontend deployment",
    iconNode: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ fill: "hsl(var(--foreground))" }}>
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    ),
    badge: "fe deploy",
    url: "https://vercel.com/",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Skills() {
  return (
    <section id="stack" className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-16">
          {/* Left sticky heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="top-10 col-span-2 h-fit gap-3 space-y-5 py-8 lg:sticky"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Tech Stack</p>
            <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              Tools &<br />Stack
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Teknologi yang digunakan mulai dari eksplorasi data, pelatihan model, deployment API, hingga antarmuka web.
            </p>

            <div className="mt-8 flex w-full gap-3 flex-wrap">
              <Button asChild size="lg">
                <Link href="/demo">
                  Coba Demo <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/Bintangqurne/creditGuard" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" className="mr-1 size-4" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  Open Github
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right list */}
          <motion.ul
            className="relative col-span-4 w-full space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10% 0px" }}
          >
            {stack.map((item, index) => (
              <motion.li key={index} variants={itemVariants}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-muted/70 transition-colors flex flex-row items-center justify-between gap-10 rounded-2xl p-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-background flex size-16 items-center justify-center rounded-xl p-2 shrink-0">
                      {item.iconNode ? (
                        item.iconNode
                      ) : (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className={cn("h-7 w-7 object-contain", item.className)}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">{item.name}</h3>
                      <p className="text-muted-foreground text-xs uppercase">{item.category}</p>
                    </div>
                  </div>
                  <span className="bg-foreground/5 mr-3 rounded-full px-3 py-1 text-xs uppercase font-medium text-muted-foreground shrink-0">
                    {item.badge}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
