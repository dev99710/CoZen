import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useScroll, useTransform } from "framer-motion";
import { AdvancedAnimation } from "@/components/ui/advanced-animation";
import { HoverEffect } from "@/components/ui/hover-effect";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = "NeK4rU-LFlxct1H5P";
const EMAILJS_SERVICE_ID = "service_7k4trkx";
const EMAILJS_TEMPLATE_ID = "template_6sz4jod";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "chavdadev206@gmail.com",
    description: "Drop us a line anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri from 9am to 6pm",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Silicon Valley, CA",
    description: "Come say hello",
  },
];

export default function Contact() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);
      const templateParams = {
        user_name: formData.get('from_name'),
        user_email: formData.get('from_email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      };

      console.log('Sending email with template params:', templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      if (result.text === 'OK') {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
          variant: "default",
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedAnimation />
      <HoverEffect />

      <div className="container mx-auto px-6 py-32">
        {/* Hero section */}
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Have a question or want to learn more? We'd love to hear from you.
            Fill out the form below and we'll get back to you shortly.
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-card relative group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6"
                >
                  <info.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-primary font-medium mb-2">{info.value}</p>
                <p className="text-muted-foreground">{info.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 rounded-3xl bg-card relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <div className="relative z-10">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Input
                      name="from_name"
                      placeholder="Name"
                      className="bg-background/50 backdrop-blur"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Input
                      name="from_email"
                      type="email"
                      placeholder="Email"
                      className="bg-background/50 backdrop-blur"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Input
                    name="subject"
                    placeholder="Subject"
                    className="bg-background/50 backdrop-blur"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Textarea
                    name="message"
                    placeholder="Message"
                    className="min-h-[150px] bg-background/50 backdrop-blur"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="px-8 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated background lines */}
      <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 50V.5H50" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
        </motion.g>
      </svg>
    </div>
  );
}
