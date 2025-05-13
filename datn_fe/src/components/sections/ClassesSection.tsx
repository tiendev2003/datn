import Link from "next/link";

const ClassesSection = () => {
  const classes = [
    {
      title: "HIIT Circuit Training",
      description: "High-intensity interval training combining cardio and strength exercises",
      duration: "45 min",
      intensity: "High",
      instructor: "Nguyen Van A",
      imageSrc: "/images/classes/placeholder.png"
    },
    {
      title: "Yoga Flow",
      description: "Dynamic vinyasa flow yoga to improve flexibility, balance, and mindfulness",
      duration: "60 min",
      intensity: "Medium",
      instructor: "Tran Thi B",
      imageSrc: "/images/classes/placeholder.png"
    },
    {
      title: "Strength & Conditioning",
      description: "Total body workout focusing on building strength and muscle endurance",
      duration: "50 min",
      intensity: "High",
      instructor: "Le Minh C",
      imageSrc: "/images/classes/placeholder.png"
    },
    {
      title: "Spin Cycling",
      description: "High-energy indoor cycling class with motivating music and guidance",
      duration: "45 min",
      intensity: "Medium-High",
      instructor: "Pham Quang D",
      imageSrc: "/images/classes/placeholder.png"
    }
  ];

  return (
    <section id="classes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fitness Classes</h2>
          <p className="text-xl text-gray-600">
            Discover a variety of exciting classes led by expert trainers to help you achieve your fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20"></div>
                <span className="text-2xl font-bold text-white">{classItem.title}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                <p className="text-gray-600 mb-4">{classItem.description}</p>
                
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{classItem.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    <span>Intensity: {classItem.intensity}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Instructor: {classItem.instructor}</span>
                  </div>
                </div>
                
                <Link 
                  href="/login" 
                  className="w-full block text-center py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Book Class
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            View Full Class Schedule
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;