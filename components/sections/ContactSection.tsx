"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import RevealSection from "@/components/ui/RevealSection";
import { shimmerStyle } from "@/components/ui/Shimmer";
import { sendMessage } from "@/lib/api";
import { contactSchema } from "@/lib/validation";
import { fadeUp, mono, display } from "@/lib/theme";

interface ContactSectionProps {
  profile: any;
  loading: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  loading,
}) => {
  const [sending, setSending] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      setSending(true);
      try {
        await sendMessage(values);
        toast.success("Message sent! I'll reply within 24h 🚀");
        resetForm();
      } catch {
        toast.error("Failed to send. Try emailing directly.");
      } finally {
        setSending(false);
      }
    },
  });

  return (
    <RevealSection id="contact">
      <div className="section-inner">
        <motion.div variants={fadeUp} className="section-label">
          04 — Contact
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="contact-card glass glow-card"
          style={{
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card glow spot */}
          <div
            style={{
              position: "absolute",
              top: "-18%",
              right: "-4%",
              width: "38%",
              height: "50%",
              background:
                "radial-gradient(ellipse,rgba(56,189,248,.055) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Left: info */}
          <div style={{ position: "relative" }}>
            <h2
              style={{
                ...display,
                fontSize: "clamp(30px,5vw,56px)",
                fontWeight: 300,
                lineHeight: 0.92,
                marginBottom: 20,
                letterSpacing: "-.02em",
              }}
            >
              Let's Build
              <br />
              Something
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400,
                }}
              >
                Together.
              </em>
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.86,
                color: "var(--muted)",
                marginBottom: 36,
                fontWeight: 300,
                maxWidth: 310,
              }}
            >
              Looking for my{" "}
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                first full-time role
              </strong>{" "}
              or freelance projects. I'd love to hear about it.
            </p>
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        ...shimmerStyle,
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        ...shimmerStyle,
                        height: 13,
                        width: "55%",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                ))
              : [
                  {
                    icon: "📧",
                    text: profile?.email || "bhavinrghoghari@gmail.com",
                    href: `mailto:${profile?.email || "bhavinrghoghari@gmail.com"}`,
                  },
                  {
                    icon: "💼",
                    text: "LinkedIn",
                    href: profile?.linkedin || "#",
                  },
                  {
                    icon: "🐙",
                    text: "GitHub",
                    href: profile?.github || "#",
                  },
                  {
                    icon: "📍",
                    text: profile?.location || "Surat, Gujarat · Remote OK",
                    href: "#",
                  },
                ].map(({ icon, text, href }, i) => (
                  <motion.a
                    key={icon}
                    href={href}
                    data-hover
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    whileHover={{ x: 7, color: "var(--accent)" }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 14,
                      textDecoration: "none",
                      color: "var(--muted)",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          ...mono,
                          fontSize: 9,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          opacity: 0.5,
                          marginBottom: 2,
                        }}
                      >
                        {["Email", "LinkedIn", "GitHub", "Location"][i]}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 210,
                        }}
                      >
                        {text}
                      </div>
                    </div>
                  </motion.a>
                ))}
          </div>

          {/* Right: form */}
          <form className="contact-form" onSubmit={formik.handleSubmit}>
            {[
              {
                label: "Name",
                key: "name",
                type: "text",
                ph: "Rohan Mehta",
              },
              {
                label: "Email",
                key: "email",
                type: "email",
                ph: "rohan@company.com",
              },
              {
                label: "Subject",
                key: "subject",
                type: "text",
                ph: "Job / Project / Collaboration...",
              },
            ].map(({ label, key, type, ph }) => (
              <div key={key}>
                <label
                  style={{
                    ...mono,
                    fontSize: 9,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: 7,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  {...formik.getFieldProps(key)}
                  placeholder={ph}
                  style={{
                    width: "100%",
                    background: "rgba(8,14,26,.75)",
                    border:
                      formik.touched[key as keyof typeof formik.values] &&
                      formik.errors[key as keyof typeof formik.values]
                        ? "1px solid #ef4444"
                        : "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    color: "var(--text)",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "var(--font-body, system-ui)",
                    boxSizing: "border-box",
                    backdropFilter: "blur(8px)",
                    transition: "border-color .2s, box-shadow .2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,.07)";
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    e.target.style.borderColor =
                      formik.touched[key as keyof typeof formik.values] &&
                      formik.errors[key as keyof typeof formik.values]
                        ? "#ef4444"
                        : "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {formik.touched[key as keyof typeof formik.values] &&
                  formik.errors[key as keyof typeof formik.values] && (
                    <div
                      style={{
                        ...mono,
                        fontSize: 10,
                        color: "#ef4444",
                        marginTop: 4,
                      }}
                    >
                      {formik.errors[key as keyof typeof formik.values]}
                    </div>
                  )}
              </div>
            ))}
            <div>
              <label
                style={{
                  ...mono,
                  fontSize: 9,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: 7,
                }}
              >
                Message
              </label>
              <textarea
                {...formik.getFieldProps("message")}
                placeholder="Tell me about the opportunity..."
                rows={4}
                style={{
                  width: "100%",
                  background: "rgba(8,14,26,.75)",
                  border:
                    formik.touched.message && formik.errors.message
                      ? "1px solid #ef4444"
                      : "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "var(--text)",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "var(--font-body, system-ui)",
                  boxSizing: "border-box",
                  backdropFilter: "blur(8px)",
                  transition: "border-color .2s, box-shadow .2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,.07)";
                }}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  e.target.style.borderColor =
                    formik.touched.message && formik.errors.message
                      ? "#ef4444"
                      : "var(--border)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {formik.touched.message && formik.errors.message && (
                <div
                  style={{
                    ...mono,
                    fontSize: 10,
                    color: "#ef4444",
                    marginTop: 4,
                  }}
                >
                  {formik.errors.message}
                </div>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              data-hover
              whileHover={
                !sending
                  ? {
                      scale: 1.02,
                      boxShadow: "0 0 28px rgba(56,189,248,.26)",
                    }
                  : {}
              }
              whileTap={!sending ? { scale: 0.98 } : {}}
              style={{
                padding: "14px",
                background: "var(--accent)",
                color: "#000",
                border: "none",
                borderRadius: 10,
                ...mono,
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.7 : 1,
                transition: "opacity .2s",
                boxShadow: "0 0 22px rgba(56,189,248,.14)",
              }}
            >
              {sending ? "⟳ Sending..." : "Send Message ↗"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </RevealSection>
  );
};

export default ContactSection;
