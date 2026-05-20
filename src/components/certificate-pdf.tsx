import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import * as fs from "fs";
import * as path from "path";

// A4 landscape: width > height
const W = 841.89;
const H = 595.28;

const BRAND = {
  red: "#E24B4A",
  paper: "#FAFAF6",
  ink: "#1a1a1a",
  inkSoft: "#4a4a48",
  inkMute: "#9a978f",
  inkFaint: "#c8c4ba",
};

// Load images from filesystem as base64 — required for @react-pdf/renderer
function loadImage(filename: string): string {
  const filePath = path.join(process.cwd(), "public", "assets", filename);
  try {
    const data = fs.readFileSync(filePath);
    const ext = filename.split(".").pop()?.toLowerCase();
    const mime = ext === "png" ? "image/png" : "image/jpeg";
    return "data:" + mime + ";base64," + data.toString("base64");
  } catch {
    return "";
  }
}

import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Cormorant Garamond",
  fonts: [
    {
      src: path.join(process.cwd(), "public/assets/fonts/cormorant-italic.ttf"),
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: path.join(process.cwd(), "public/assets/fonts/cormorant-italic-medium.ttf"),
      fontStyle: "italic",
      fontWeight: 500,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: path.join(process.cwd(), "public/assets/fonts/inter-light.ttf"),
      fontWeight: 300,
    },
    {
      src: path.join(process.cwd(), "public/assets/fonts/inter-regular.ttf"),
      fontWeight: 400,
    },
    {
      src: path.join(process.cwd(), "public/assets/fonts/inter-medium.ttf"),
      fontWeight: 500,
    },
    {
      src: path.join(process.cwd(), "public/assets/fonts/inter-bold.ttf"),
      fontWeight: 700,
    },
  ],
});

const s = StyleSheet.create({
  page: {
    width: W,
    height: H,
    backgroundColor: BRAND.paper,
    position: "relative",
  },
  outerFrame: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    border: "0.75pt solid #E24B4A",
  },
  innerFrame: {
    position: "absolute",
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
    border: "0.5pt solid #E24B4A",
    opacity: 0.35,
  },
  content: {
    position: "absolute",
    top: 18,
    left: 75,
    right: 75,
    bottom: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  brandLabel: {
    fontSize: 7,
    letterSpacing: 2.5,
    color: BRAND.inkSoft,
    marginTop: 4,
    textTransform: "uppercase",
    fontFamily: "Inter",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 220,
    marginTop: 10,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: BRAND.inkFaint,
  },
  dividerDot: {
    width: 4,
    height: 4,
    backgroundColor: BRAND.red,
    marginHorizontal: 8,
  },
  certLabel: {
    fontSize: 12,
    letterSpacing: 3.5,
    color: BRAND.inkSoft,
    textTransform: "uppercase",
    marginBottom: 3,
    fontFamily: "Inter",
  },
  certType: {
    fontSize: 17,
    color: BRAND.red,
    fontStyle: "italic",
    marginBottom: 12,
    fontFamily: "Cormorant Garamond",
  },
  certifiesLabel: {
    fontSize: 7.5,
    letterSpacing: 2,
    color: BRAND.inkMute,
    textTransform: "uppercase",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  recipientName: {
    fontSize: 54,
    color: BRAND.ink,
    fontStyle: "italic",
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily: "Cormorant Garamond",
  },
  nameLine: {
    width: 380,
    height: 0.5,
    backgroundColor: BRAND.inkFaint,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.7,
    color: BRAND.inkSoft,
    maxWidth: 480,
    textAlign: "center",
    fontFamily: "Inter",
  },
  bottomRow: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 80,
  },
  sideCol: {
    width: 230,
    alignItems: "center",
  },
  mediaArea: {
    height: 120,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  signatureImg: {
    height: 120,
    width: 190,
    objectFit: "contain",
    marginBottom: -12,
  },
  sealImg: {
    height: 120,
    width: 120,
    objectFit: "contain",
  },
  rule: {
    width: "100%",
    height: 0.75,
    backgroundColor: BRAND.ink,
    marginBottom: 5,
  },
  captionName: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: BRAND.ink,
    textAlign: "center",
    fontFamily: "Inter",
  },
  captionSub: {
    fontSize: 7,
    color: BRAND.inkMute,
    letterSpacing: 0.3,
    lineHeight: 1.5,
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Inter",
  },
  centerVerify: {
    alignItems: "center",
    paddingBottom: 10,
  },
  verifyUrl: {
    fontSize: 7,
    color: BRAND.inkMute,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Inter",
  },
  verifyCode: {
    fontSize: 8,
    color: BRAND.red,
    letterSpacing: 1.5,
    marginTop: 3,
    textAlign: "center",
    fontFamily: "Inter",
  },
});

interface Props {
  kind: "completion" | "mastery";
  recipientName: string;
  cohortDate: string;
  issuedDate: string;
  verificationCode: string;
}

export function CertificatePDF({
  kind,
  recipientName,
  cohortDate,
  issuedDate,
  verificationCode,
}: Props) {
  const isMastery = kind === "mastery";

  const logoData = loadImage("logo-ai-muse.png");
  const signatureData = loadImage("signature-bryan.png");
  const sealData = loadImage(isMastery ? "seal-mastery.png" : "seal-completion.png");

  const bodyText =
    "has completed all ten days of the Make AI Your Muse programme" +
    (isMastery ? " with distinction," : ",") +
    " a daily practice in thinking and working better with AI. Cohort of " +
    cohortDate + ".";

  return (
    <Document>
      <Page
        size={[W, H]}
        style={s.page}
      >
        {/* Frames */}
        <View style={s.outerFrame} />
        {isMastery && <View style={s.innerFrame} />}

        {/* Main content — top section */}
        <View style={s.content}>
          {logoData ? (
            <Image src={logoData} style={s.logo} />
          ) : (
            <View style={{ width: 48, height: 48, backgroundColor: BRAND.red }} />
          )}

          <Text style={s.brandLabel}>Make AI Your Muse</Text>

          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <View style={s.dividerDot} />
            <View style={s.dividerLine} />
          </View>

          <Text style={s.certLabel}>Certificate</Text>
          <Text style={s.certType}>{"of " + (isMastery ? "Mastery" : "Completion")}</Text>

          <Text style={s.certifiesLabel}>This certifies that</Text>

          <Text style={s.recipientName}>{recipientName}</Text>
          <View style={s.nameLine} />

          <Text style={s.bodyText}>{bodyText}</Text>
        </View>

        {/* Bottom row — absolutely positioned so it always sits at the bottom */}
        <View style={s.bottomRow}>

          {/* Left — signature */}
          <View style={s.sideCol}>
            <View style={s.mediaArea}>
              {signatureData ? (
                <Image src={signatureData} style={s.signatureImg} />
              ) : null}
            </View>
            <View style={s.rule} />
            <Text style={s.captionName}>Professor Bryan Cassady</Text>
            <Text style={s.captionSub}>{"AI Adoption Strategist | Author, The Generative Organization"}</Text>
          </View>

          {/* Centre — verification */}
          <View style={s.centerVerify}>
            <Text style={s.verifyUrl}>sparks.bryancassady.com/verify</Text>
            <Text style={s.verifyCode}>{verificationCode}</Text>
          </View>

          {/* Right — seal + date */}
          <View style={s.sideCol}>
            <View style={s.mediaArea}>
              {sealData ? (
                <Image src={sealData} style={s.sealImg} />
              ) : null}
            </View>
            <View style={s.rule} />
            <Text style={s.captionName}>{issuedDate}</Text>
            <Text style={s.captionSub}>Date of issue</Text>
          </View>

        </View>

      </Page>
    </Document>
  );
}