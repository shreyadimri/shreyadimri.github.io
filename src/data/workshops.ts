import PhysaliaParticipants from "../assets/images/physalia2025-participants.png";
import Behaviour2025Photo from "../assets/images/behaviour2025-SD2.jpg";
import Behaviour2025Slides from "../assets/workshops/behaviour2025-workshop.pdf";
import EcoOpen2025Photo from "../assets/images/ecoopen2025-SD.png";
import EcoOpen2025Slides from "../assets/workshops/ecoopen2025-quarto-workshop.pdf";

export interface Workshop {
  id: string;
  title: string;
  description?: string;
  event: string;
  role?: string;
  date: Date;
  duration?: string;
  location?: string;
  presenterImage?: string;
  materials?: {
    src: string;
    kind: "image" | "pdf";
    label: string;
  };
}

export const workshops: Workshop[] = [
  {
    id: "physalia2025-SRMA",
    title: "Meta-analysis in R",
    description: `
      Evidence synthesis includes systematic reviews, meta-analyses, and other forms of evidence such as systematic maps or research weaving that allow us to summarize knowledge. When preceded by a systematic review, meta-analysis is a powerful statistical tool for quantitatively integrating findings across studies to (1) test overall effects and their generalizability, (2) understand context-dependencies, and (3) generate and test second-order hypotheses. Systematic reviews and meta-analyses have become a standard approach for qualitatively and quantitatively synthesizing evidence across fields, and their use has increased exponentially in the last decade. This course will provide a hands-on overview and introduction to modern methods for evidence synthesis, with a special focus on systematic review and meta-analysis in ecology and evolution.
      <br><br>
      We will begin with a detailed overview of the systematic review approach, focusing on question formation, systematic searching and study screening. Next, we will focus on the meta-analytic process, specifically on effect size choice, data extraction, data analysis, and importantly, result interpretation. We will make use of multilevel meta-analysis and meta-regression, with an introduction on how to account for phylogeny when multiple species are synthesised. Since meta-analytic results cannot be interpreted without a deep understanding of heterogeneity and publication bias, we will cover in detail how to estimate, adjust for, and interpret heterogeneity and publication bias.
      <br><br>
      This course will include a mix of lectures and hands-on exercises using real meta-analytic datasets. The emphasis throughout the course is on the application of the various methods and the interpretation of the results using the free software R and the R packages ‘metafor’ (Viechtbauer 2010) and ‘orchaRd’ (Nakagawa et al. 2023). The course will follow the principles of open science, with a strong focus on the importance of adhering to preferred reporting items for systematic reviews and meta-analyses in ecology and evolutionary biology (PRISMA EcoEvo; O’Dea et al. 2021). Throughout, we will consider examples of how to interpret results and present them using tables and data visualization, and for each step, we will provide literature and practical resources (e.g., R scripts).
      <br><br>
      <strong>Program</strong>
      <br><br>
      <strong>Monday – Classes from 13:00–17:00 CET</strong><br>
      Lectures and exercises on question formation and how to perform literature searches for scientific literature, including grey literature, in search platforms such as Web of Science, Scopus and PubMed.
      <br><br>
      <strong>Tuesday – Classes from 13:00–17:00 CET</strong><br>
      Lectures and exercises on title-and-abstract and full-text screening, including the use of decision trees to increase inter-observer agreement and reproducibility, and an introduction to Risk of Bias assessments.
      <br><br>
      <strong>Wednesday – Classes from 13:00–17:00 CET</strong><br>
      Lectures and exercises on effect size choice, data extraction and data analysis (meta-analysis and meta-regression). The focus will be on the meta-analysis of correlations (r, Zr) and mean differences (lnRR, SMD), but we will also introduce the meta-analysis of variance (lnCVR, lnVR) and other less commonly used effect sizes in ecology and evolution.
      <br><br>
      <strong>Thursday – Classes from 13:00–17:00 CET</strong><br>
      Lectures and exercises on data analysis (continuation), heterogeneity and publication bias with a focus on how to estimate heterogeneity using a pluralistic approach, the importance of prediction intervals, and how to test for and adjust for publication bias (e.g., small-study and decline effects) using multilevel meta-regressions.
      <br><br>
      <strong>Friday – Classes from 13:00–17:00 CET</strong><br>
      Lectures, exercises and discussion on result interpretation, followed by a Q&A session (including about your own ongoing evidence synthesis projects, so bring them along).
      <br><br><br>
      More details about the workshop can be found here:
      <a href="https://www.physalia-courses.org/courses-workshops/metain-r/" 
         target="_blank" 
         rel="noopener noreferrer"
         class="text-blue-700 underline underline-offset-2 hover:text-blue-900">
         Meta-analysis in R
      </a>.
    `,
    event: "Physalia Courses",
    role: "Co-instructor with Dr. Alfredo Sánchez-Tójar",
    date: new Date("2025-02-10"),
    duration: "5 days",
    location: "Online",
    presenterImage: PhysaliaParticipants.src,
    // no materials yet – you can add when slides are ready
  },
  {
    id: "behaviour2025-SRMA",
    title: "Introduction to Systematic Review and Meta-analysis",
    description:
      "Evidence synthesis, which includes systematic maps, research weaving, and meta-analysis, enables researchers to identify patterns across studies, assess generalisability, and understand context-dependent effects. Systematic reviews and meta-analyses have become a standard approach for qualitatively and quantitatively synthesising evidence across fields, and their use has increased exponentially in the last decade. This workshop offers an applied introduction to the basics of evidence synthesis, focusing on systematic reviews and meta-analyses. We will explore what makes a strong systematic review and introduce some tools for literature search and screening. Next, we will focus on the meta-analytic process, including effect size selection, conducting multilevel meta-analyses and meta-regression in R, interpreting results and visualisation with some common plots. We will also explore heterogeneity and publication bias, which are essential for a comprehensive understanding of meta-analytical results. The session combines lectures, small hands-on exercises, and discussions, using real meta-analytic datasets. It will be ideal for PhD students, postdocs, and early-career researchers, but everyone is welcome. No prior experience with meta- analysis is required. Some basic statistical knowledge will be assumed for the workshop. Although this is not an R programming course, some familiarity with R is necessary. The workshop will use examples from behavioural ecology and evolution, but the methods are generally applicable across research fields.",
    event: "Behaviour 2025 Pre-conference Workshop",
    role: "Instructor",
    date: new Date("2025-08-24"),
    duration: "5 hours",
    location: "Kolkata, India",
    presenterImage: Behaviour2025Photo.src,
    materials: {
      src: Behaviour2025Slides,
      kind: "pdf",
      label: "Workshop slides",
    },
  },
  {
    id: "ecoopen2025-quarto",
    title: "Reproducible Manuscripts with Quarto",
    description:
      "Transparency and reproducibility are fundamental aspects of good research practices. While replicating scientific findings can be challenging, computational reproducibility —particularly the outputs reported in a manuscript —must be entirely reproducible. In this workshop, we will learn to set up a reproducible workflow to create a publication-ready manuscript that combines data, analyses, text, figures and references into a single final output. We will use the Quarto publishing system in combination with R (or Python) to create a reproducible manuscript. More specifically, we will talk about: <br><br> ● What Quarto? Why Quarto? — Pros and Cons of using Quarto Manuscripts <br>● Project Structure for transparency <br>● Using Markdown and Inline code for writing text <br>● Using Code Chunks and embedding outputs to create figures, tables<br>● Manage references using Zotero or BibTex <br>● Render our Quarto Project to Docx, HTML, pdf files<br><br>This workflow is aimed at reducing the amount of human error, improving computational reproducibility and making updating scientific manuscripts more efficient. If you have used R-Markdown before, think of Quarto as its more powerful successor. It has the potential to be able to enhance transparency of a project and make it more accessible to other researchers.",
    event: "Eco Open Symposium by Research Quality Improvement (RQI)",
    role: "Instructor",
    date: new Date("2025-09-20"),
    duration: "1 hour",
    location: "Sošice, Nature Park Zumberak, Croatia",
    presenterImage: EcoOpen2025Photo.src,
    materials: {
      src: EcoOpen2025Slides,
      kind: "pdf",
      label: "Workshop slides",
    },
  },
  // add more workshops here...
];
