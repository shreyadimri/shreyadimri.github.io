// src/data/publications.ts

// use consistent, lowercase literals
export type PubStatus = "prereg" | "preprint" | "in-press" | "published";
export type PubCategory = "open-science" | "biology";

export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string;
  journal?: string;
  repository?: string;
  status: PubStatus;
  category: PubCategory;
  preregLink?: string;
  preprintLink?: string;
  publicationLink?: string;
  dataLink?: string;
  codeLink?: string;
  isNew?: boolean;
}

export const publications = [
  {
    id: "noble-2025-community-driven-preprints",
    year: 2025,
    title: "The promise of community-driven preprints in ecology and evolution",
    authors:
      "Noble D.W.A., Xirocostas Z.A., Wu N.C., Martinig A.R., Almeida R.A., Bairos-Novak K.R., Balti H., Bertram M.G., Bliard L., Brand J.A., Byrne I., Chan Y-C., Clink D.J., Corbel Q., Correia R.A., Crawford-Ash J., Culina A., D’Bastiani E., Deme G.G., de Souza Leite M., Dhellemmes F., Dimri S., Drobniak S.M., Elsy A.D., Everingham S.E., Gascoigne S.J.L., Grainger M.J., Hossack G.C., Hovstad K.A., Ivimey-Cook E.R., Jones M.L., Kacergytė I., Küstner G., Leibold D.C., Mair M.M., Martin J., Mizuno A., Moodie I.R., Moreau D., O’Dea R.E., Orr J.A., Paquet M., Parajuli R., Pick J.L., Pottier P., Purgar M., Recio P., Roche D.G., Royauté R., Shafiei Sabet S., Segovia J.M.G., Silva I., Sánchez-Tójar A., Soares B.E., Szabo B., Takola E., Thore E.S.J., Timilsina B., van Dis N.E., Verberk W.C.E.P., Vriend S.J.G., Wild K.H., Williams C., Yang Y., Nakagawa S., Lagisz M.",
    journal: "Proceedings of the Royal Society B: Biological Sciences",
    status: "published",
    category: "open-science",
    preprintLink: "https://hal.science/hal-04660631v1",
    publicationLink: "https://doi.org/10.1098/rspb.2024.1487",
    dataLink: "https://doi.org/10.5281/zenodo.14533230",
    codeLink: "https://github.com/daniel1noble/ecoevo_1000",
  },
  {
    id: "ivimey-cook-2025-tada-code-sharing",
    year: 2025,
    title: "TADA! Simple guidelines to improve code sharing",
    authors:
      "Ivimey-Cook E.R., Culina A., Dimri S., Grainger M.J., Kar F., Lagisz M., Moran N.P., Nakagawa S., Roche D.G., Sánchez-Tójar A., Windecker S.M., Pick J.L.",
    repository: "EcoEvoRxiv",
    status: "preprint",
    category: "open-science",
    preprintLink: "https://doi.org/10.32942/X2D93K",
  },
    {
    id: "natahlie-cooper-bes-data-code-archiving-2026",
    year: 2026,
    title: "Data-and code-archiving in the British Ecological Society journals: present status and recommendations for future improvements",
    authors:
      "Cooper N., Allen B.J., Almaani N., Altwegg R., Balogh J., Balti H., Barber R.A., Barbosa de Sousa M.E., Barreat J.G.N., Barrett C.F., Bates R., Beale A.M.J.M., Bliard L., Blömer N., Borovyk D., Bunnenberg C., Bygate E.A., Cash L., Chatterjee N., Chen T.-W., Chiti A., Chung S.S.-W., Chuquillanqui H., Ciezarek A., Clarkson A., Codling E., Corradini A., Cowans A., Dartnell S., Davis A.J.S., De Benedictis L.L.M., Deme G.G., Devenish C., Dimri S., Dittrich C., Dorheim K.R., Drage H.B., Dueñas M.-A., Efstathiou A., Evans L.C., Ferreira Santos M.E., Foxx A.J., Gardiner R.J., Gaudard J., Gearty W., Graham L., Graves V.M., Green H.M., Greensmith R.V., Gérard S., Halbritter A.H., Hartke T.R., Hechler R.M., Hindle B.J., Hsing P.-Y., Illanas S., Iossa G., Jackson E.E., Jones L.A., Jones F.A.M., Jones J.A., Jupke J.F., Kaunain N.N., Kennedy R., Kerr M.R., Kester N.J., Klaassen M., Konecka O., Krasnow R., Kukowski R., Kumar A., Kuminski R., Kuzey K.S., Laccetti L., Lagisz M., Latifi H., Lecomte N., Luchmun K.D., Lévêque A., Markitantova A., Marshall B.M., Menares-Barraza E., Mertens D., Mesbahi G., Meyer J., Millard J., Montilla L.M., Moreira B., Morera A., Murali G., Murray M.P., Märker F., Nagahawatte K., Narraway C.L., Niven H.I., Nytko A.G., Ohse B., Patterson S., Phillips H.R.P., Pienaar R., Pollo P., Ponce A., Porto L.M.V., Preston E.F.R., Prieul C.S., Prylutska A., Prylutskyi O., Radman-Daw K., Raharison A.M., Rao R., Read F.R., Record S., Rees W., Reeve R., Rhodes H., Rocabado C., Rouviere A., Rönnfeldt A., Sagouis A., Sakhalkar S.P., Santos G.S., Shakur M.A., Shaw R., Siegieda D., Šmídova L., Simmons B.I., Sisley H.G., Sánchez-Tójar A., Taboada F.G., Taylor N.G., Teague H., Thrikkadeeri K., Thuroczy V., Varah A., Vinay K.L., Watrobska C.M., Williams Z.B., Windecker S.M.",
    repository: "EcoEvoRxiv",
    status: "preprint",
    category: "open-science",
    preprintLink: "https://doi.org/10.32942/X26W9V",
    codeLink: "https://github.com/nhcooper123/reproduce-reuse-recycle",
  },
  {
  id: "dimri-2025-why-do-birds-use-green-nest-material",
  year: 2025,
  title: "Why do birds use green nest material? A systematic review and meta-analysis of experiments",
  authors: "Dimri S., Rizvi T., Segovia J.M.G., Ottensmann M., Sánchez-Tójar A.",
  repository: "EcoEvoRxiv",
  status: "preprint",
  category: "biology",
  preregLink: "https://osf.io/s7j6z",
  preprintLink: "https://doi.org/10.32942/X2X65Z",
  codeLink: "https://github.com/shreyadimri/Green_Nest_Material",
  isNew: true,
   }
// add more here...
].sort((a, b) => b.year - a.year); // newest year first
