import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GlassCard } from "@/components/ui/glass-card";
import { Zap, Users, BarChart3, Loader2 } from "lucide-react";

const waitlistSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistForm = z.infer<typeof waitlistSchema>;

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistForm) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (response: any) => {
      console.log("Success response:", response);
      setIsSubmitted(true);
      if (response.alreadyRegistered) {
        setQueuePosition(response.position);
        toast({
          title: "🎉 You're already on the list!",
          description: `You are #${response.position} in the waitlist queue.`,
          duration: 5000,
        });
      } else {
        setQueuePosition(response.position);
        toast({
          title: "🎉 You're on the list!",
          description: `You are #${response.position} in the waitlist queue. We'll notify you when FeedbackMe launches.`,
          duration: 5000,
        });
      }
    },
    onError: (error: any) => {
      const message = error.message || "Something went wrong. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: WaitlistForm) => {
    mutation.mutate(data);
  };

  const scrollToForm = () => {
    const element = document.getElementById('waitlist-form');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80; // Account for fixed nav (64px) + padding (16px)
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen endless-bg no-scroll-whitespace">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                FeedbackMe
              </div>
            </div>
            <Button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 px-3 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 text-black"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-8 lg:px-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-900/20 to-amber-900/30"></div>
        
        {/* Floating Glass Elements */}
        <motion.div 
          className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 glass-morphism rounded-full opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-32 sm:top-40 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 glass-morphism rounded-lg rotate-45 opacity-30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-32 sm:bottom-40 left-4 sm:left-20 w-24 h-24 sm:w-40 sm:h-40 glass-morphism rounded-full opacity-15"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-amber-200 bg-clip-text text-transparent">
                Transform Websites Into
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Collaborative Communities
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              FeedbackMe is the plug-and-play tool that turns user feedback into actionable insights. 
              <span className="text-yellow-300"> Just a few lines of code</span> to build transparent, 
              voting-powered communities around your product.
            </p>

            {/* Waitlist Form */}
            <div id="waitlist-form" className="max-w-md mx-auto mb-8 sm:mb-12 px-4 pt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Join the Waitlist</h3>
                  {!isSubmitted ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Full Name"
                                  className="glass-input"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Email Address"
                                  className="glass-input"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-sm" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={mutation.isPending}
                          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-black"
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Joining...
                            </>
                          ) : (
                            "Reserve My Spot"
                          )}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-center">
                      <div className="text-yellow-300 font-medium">🎉 You're on the list!</div>
                      <div className="text-yellow-200 text-sm mt-1">
                        {queuePosition ? (
                          `You are #${queuePosition} in the waitlist queue.`
                        ) : (
                          "We'll notify you when FeedbackMe launches."
                        )}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 text-slate-400 px-4 mb-8 sm:mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">2.5K+</div>
                <div className="text-xs sm:text-sm">Developers Waiting</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">15mins</div>
                <div className="text-xs sm:text-sm">Avg. Integration</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs sm:text-sm">Uptime SLA</div>
              </div>
            </motion.div>
          </motion.div>
        </div>


      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Why Developers Choose FeedbackMe
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Stop guessing what your users want. Build features that matter with transparent, 
              community-driven feedback that prioritizes itself.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Lightning Integration</h3>
                <p className="text-slate-300 leading-relaxed">
                  Just a few lines of code and you're live. No complex setup, no configuration headaches. 
                  Get feedback flowing in minutes, not days.
                </p>
              </GlassCard>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Community-Powered</h3>
                <p className="text-slate-300 leading-relaxed">
                  Transparent feedback boards where users vote on what matters most. 
                  Let your community prioritize features democratically.
                </p>
              </GlassCard>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Actionable Analytics</h3>
                <p className="text-slate-300 leading-relaxed">
                  Turn feedback chaos into clear insights. See trends, identify pain points, 
                  and make data-driven product decisions.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From integration to insights in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Step 1 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Embed Widget</h3>
              <p className="text-slate-300 leading-relaxed">
                Copy our snippet and paste it into your website. The feedback widget appears instantly, 
                ready for your users to share their thoughts.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Users Engage</h3>
              <p className="text-slate-300 leading-relaxed">
                Your community submits feedback, votes on features, and discusses improvements. 
                Everything happens transparently for maximum trust.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Build What Matters</h3>
              <p className="text-slate-300 leading-relaxed">
                Access your dashboard to see prioritized feedback, track trends, and build features 
                your users actually want.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  Ready to Transform Your Product?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join 2,500+ developers building better products with community-driven feedback. 
                Be among the first to experience the future of user engagement.
              </p>
              <Button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-black"
              >
                Join the Waitlist Now
              </Button>
              <div className="mt-6 text-sm text-slate-400">
                ⚡ Early access • 🎯 Priority support • 🚀 Launch discounts
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-4 md:mb-0">
              FeedbackMe
            </div>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2025 FeedbackMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
