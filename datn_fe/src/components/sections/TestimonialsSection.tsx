
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Hoang Minh",
      role: "Member for 2 years",
      image: "/images/testimonial-1.jpg",
      quote: "FitHub completely transformed my fitness journey. The trainers are extremely knowledgeable and the facilities are top-notch. I've achieved results I never thought possible!"
    },
    {
      name: "Trang Nguyen",
      role: "Member for 1 year",
      image: "/images/testimonial-2.jpg",
      quote: "The variety of classes and the supportive community make FitHub stand out from other gyms. I look forward to every session and have made significant progress since joining."
    },
    {
      name: "Binh Pham",
      role: "Member for 6 months",
      image: "/images/testimonial-3.jpg",
      quote: "The personal training at FitHub has been a game-changer for me. My trainer created a customized program that fits my goals perfectly, and the results speak for themselves."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-xl text-gray-600">
            Real testimonials from our valued gym members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex-grow">
                <svg className="h-10 w-10 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4">
                  {/* Replace with actual testimonial images later */}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-4xl font-bold">
              <span className="text-primary">500+</span>
              <p className="text-base text-gray-600 font-normal mt-1">Happy Members</p>
            </div>
            <div className="text-4xl font-bold">
              <span className="text-primary">20+</span>
              <p className="text-base text-gray-600 font-normal mt-1">Expert Trainers</p>
            </div>
            <div className="text-4xl font-bold">
              <span className="text-primary">30+</span>
              <p className="text-base text-gray-600 font-normal mt-1">Weekly Classes</p>
            </div>
            <div className="text-4xl font-bold">
              <span className="text-primary">95%</span>
              <p className="text-base text-gray-600 font-normal mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;