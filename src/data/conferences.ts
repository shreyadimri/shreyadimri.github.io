// src/data/conferences.ts

import Behaviour2025Image from "../assets/images/behaviour2025-SD.png";
import DZGGraduateMeet2023Image from "../assets/images/DZG-GraduateMeet2023-people.jpg";

import Behaviour2025TalkPdf from "../assets/conferences/behaviour2025-talk.pdf";
import Nc3Retreat2023PosterPdf from "../assets/conferences/nc3-retreat2023-poster.pdf";
import Nc3Retreat2022PosterPdf from "../assets/conferences/nc3-retreat2022-poster.pdf";

export type ConferenceType = "talk" | "poster";

export interface Conference {
  id: string;
  title: string;
  abstract?: string;
  session?: string;
  event: string; // conference name
  type: ConferenceType;
  date: Date;
  location?: string;
  presenterImage?: string;
  file: {
    src: string; // built URL to image or pdf
    kind: "image" | "pdf";
    label: string; // e.g. "View slides" / "View poster"
  };
}

export const conferences: Conference[] = [
  {
    id: "behaviour2025-talk",
    title:
      "Evaluating the Adaptive Function of Green Nest Material in Birds: A Systematic Review and Meta-Analysis",
    abstract:
      "The addition of fresh green plant material to nests (e.g. leaves, sprigs and branches of trees and herbs) is a widespread behaviour across many bird species. An observed preference for certain aromatic plants and the active gathering of these plants beyond the territories in some birds, is suggestive of adaptive advantage. This behaviour has intrigued researchers for decades and several hypotheses have been proposed to explain it, including mate attraction, nest protection against parasites and pathogens, and direct benefits to nestlings. While many experimental studies have tested these different hypotheses, the evidence is conflicting, and yet, no quantitative synthesis has been conducted until now. In our study, we systematically reviewed the literature and meta-analytically synthesized all available experimental studies to assess the effect of green material on fitness proxies, including reproductive success, parasite load, and nestling health. We extracted 238 effect sizes from 29 studies coming from 6 bird species, including 2 unpublished datasets. Previous work has often assumed strong adaptive benefits, however our findings suggest otherwise. We find small and inconsistent yet positive effects (SMDH=0.16[CI:0.027-0.298], n=26, k=236) of fitness benefits of green nest material. Could the benefits be more context-dependent than previously thought? I will discuss the results of this meta-analysis and its implication for future research, shedding light on directions for the field.",
    event: "Behaviour 2025: XXXVIII International Ethological Congress",
    session: "Symposium: Quantitative Approaches in Behaviour",
    type: "talk",
    date: new Date("2025-08-30"),
    location: "Kolkata, India",
    presenterImage: Behaviour2025Image.src,
    file: {
      src: Behaviour2025TalkPdf,
      kind: "pdf",
      label: "View slides",
    },
  },

  {
    id: "dzg-2023-poster",
    title:
      "Estimating among individual variation in reaction norms: a meta-analytical approach",
    abstract:
      "Individual differences in animal behavior and physiology are important drivers of ecological and evolutionary processes. Variation in reaction norms, which describes how traits change in response to environmental variation for a given genotype, is a key aspect of these individual differences. While many studies use mixed-effects modeling to account for individual variation in reaction norms, few have quantified the magnitude of this variation. As such, the prevalance and magnitude of among-individual variation in reaction norms is not well-understood. We estimate the contribution of among-individual variation to total phenotypic variation and explore how accounting for this variation changes our inferences about population-level effects. We test the prediction that it explains only a small part of the total phenotypic variation in wild populations. We first systematically searched for studies using random-slope mixed-effects models to study phenotypic traits in non-human, non-inbred organisms, in the field or brought to controlled lab settings. Our analytical approach then builds on recent methodological advances that allow us to reanalyse published open datasets and integrate them using meta-analysis. The systematic literature search yielded 1765 unique references, out of which, 1196 passed the title-and-abstract screening, but only 170 provided open data and could then be reanalysed. Our results will provide a comprehensive and rigorous synthesis of the current state of knowledge on individual variation in reaction norms across species. These findings will be key to understand individuality, and thus, particularly important for the fields of animal personality and plasticity.",
    event:
      "Joint Graduate Meeting of the Ethological Society and the Behavioral Biology Section of the DZG",
    type: "poster",
    date: new Date("2023-11-10"),
    location: "Bielefeld, Germany",
    presenterImage: DZGGraduateMeet2023Image.src,
    file: {
      src: Nc3Retreat2023PosterPdf,
      kind: "pdf",
      label: "View poster",
    },
  },

  {
    id: "nc3-retreat2023-poster",
    title: "Do random slopes matter?",
    event: "NC3 Retreat 2023",
    type: "poster",
    date: new Date("2023-08-22"),
    location: "Dörentrup, Germany",
    file: {
      src: Nc3Retreat2023PosterPdf,
      kind: "pdf",
      label: "View poster",
    },
  },

  {
    id: "nc3-retreat2022-poster",
    title: "Estimating among individual variation in reaction norms",
    event: "NC3 Retreat 2022",
    type: "poster",
    date: new Date("2022-08-29"),
    location: "Hoherodskopf, Germany",
    file: {
      src: Nc3Retreat2022PosterPdf,
      kind: "pdf",
      label: "View poster",
    },
  },
  // add more here...
];
