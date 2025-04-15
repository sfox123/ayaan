import { Gallery } from "next-gallery";

const images = [
  {
    src: "https://drive.google.com/uc?export=view&id=12_EcDhon6QyWYTqqBBunNqfQqJ_qNzqX",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1HjKnKlMtlcVKDDcGmRWQvedREDPokR-e",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Os_TrSXO2Orir1UioXXntjq8eIr9NV0M",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1XJbeYJekoiLDYI3xTZsXfjxQ2gAtia8g",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=12aNukvOxhUjzkDST5nNpN83RHXtZxFlB",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=19vOdIGh2XWX1noPfnl14Z2BQPa54IdF9",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1dYrQBovUGEoxCdwmZb3F7fngeiU2DGFC",
    aspect_ratio: 10 / 6,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=15pSRjcTiiB_VOLXQl1nkZeBrNxamsCR_",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1GzAOAZzABH98e4ADcfBCDiIbY2Ec0Crl",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=17mjPoj6_1xZoeNjcH8IjeQNQsGBoi9F6",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1odbjNY9Humj-WlVhVkmv50ujr-oenklC",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Dks-WR6lWlQU8IITnf6aJ__pAV2QvK-L",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1aDP3VBiJHLrgsYOnwTfEPBGgDxeyZ08t",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1RH2zeBNguMPSDpmb3stgavzvGQVkRCZG",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ei_Vtc3lPX7o77DWkKAxnPSTG3Nkl5aZ",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1kxHZOntlEaTALrF7RBgL2CfM0H05ZCEN",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1TVw19XcwXpg8gGmNwFiSRBD8jzCBOEhi",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1XJOQPNZrZch0HleB3Pm6cztfeF1NNEMV",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1TExA9SpUfHx40lzApvANlVVq4tEQG0Mm",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1kxHZOntlEaTALrF7RBgL2CfM0H05ZCEN",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=12gnFDcymiW1SeH3gIM2LIbD91ncu1yGH",
    aspect_ratio: 10 / 10,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1m2XLNo2xNVlVa3GwJ4ivGq8ihxoGW7ZV",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1C9UlTbRCzLAOP4rS60u9qVeWtN7xXQE5",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1r9KvbCsd1NLCpE8_BCBtSomGSA9mwnxT",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=15GsqP1_jRFZ-Zj4ELmb4mHsdkmqChbz5",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1xaP_bvoLOIA_iVdEFnH-CAK8tjMjIPzj",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ZLU348HGJlSffKDezr1XY-jFdRyGX3fF",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1DmhT3yC_gKxxqKpGwSWohMNATWYQObAa",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1vCmQ_2VyhKXL7OhxeW4LmBkID1e58bNG",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1NW4ZhvOb1tnjgnMQUKOvDIugG_jwvCUn",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ehw6QUWGW6dt0VjprTV2uNHL973On8nP",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1l5nKmKUawfWISS7Vc89-pciEQVGapaGA",
    aspect_ratio: 10 / 14,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1cLHy-GYfxRkdBccL2QmQ2wSrT5XYMroi",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1VftrHhBPDk79P7ULwjL-__02GjAdpaFE",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1dDru-SiaSPkKUyVNKctBYCpG39rz-kQA",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=10KvPr_LdaEA1SgcHZpDnA0LeJSnHVShR",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1gXiUzdwopKbcXza-XqkhwzhnvdPiW6PQ",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1v3__iMcOhsfu30io3MkPaDjckdL7uKZQ",
    aspect_ratio: 10 / 12,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1msY_7q1VNJFjwlEmOKFtoAywe-r9vWDi",
    aspect_ratio: 10 / 8,
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1W2F6C_imiooz0rHRbSDBL-zfRaojg1ye",
    aspect_ratio: 10 / 12,
  },
];
const widths = [500, 1000, 1600];
const ratios = [2.2, 4, 6, 8];

export default function MyGallery() {
  return (
    <div style={{ margin: "40px" }}>
      <Gallery {...{ images, widths, ratios }} />
    </div>
  );
}
