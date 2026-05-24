import DaText from '@/components/ui/typography/DaText';
import React from 'react';

const ServiceList = () => {
  // The data array to be mapped
  const services = [
    { id: 1, name: 'Website Design' },
    { id: 2, name: 'Responsive Web Design' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'Website Development' },
    { id: 5, name: 'Corporate Identity' },
    { id: 6, name: 'Insights & Analytics' },
    { id: 7, name: 'Motion Graphics' },
    { id: 8, name: 'Research & Discovery' },
    { id: 9, name: 'SEO Services' },
  ];

  return (
    <section className="bg-white w-full py-30 ">
      <div className="flex flex-col  gap-y-30 w-full max-w-[1200px] mx-auto">
        
        {/* Left Heading Section */}
        <div>

        <DaText variant="headlineSm" className='max-w-[700px] ' >Elevating your brand at every touchpoint.</DaText>
        </div>

        

        {/* Right Mapped List Section */}
        <div className=" w-full max-w-[700px] self-end lg:col-span-7  grid grid-cols-1 md:grid-cols-2 gap-x-12  gap-y-1 lg:pl-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex justify-between  max-w-[280px] items-center py-2 group cursor-pointer border-b border-transparent hover:border-gray-100 transition-all duration-200 "
            >
              <span className="text-[20px] text-gray-900 font-medium tracking-wide group-hover:text-orange-500 transition-colors duration-200">
                {service.name}
              </span>
              <span className="text-orange-500 text-base font-semibold transition-transform ">
                +
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceList;