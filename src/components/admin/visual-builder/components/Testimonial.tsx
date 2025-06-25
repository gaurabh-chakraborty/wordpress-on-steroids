
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  styles?: React.CSSProperties;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  quote = "This service has completely transformed our business. The results exceeded our expectations!",
  author = "John Smith",
  role = "CEO",
  company = "Tech Corp",
  avatarUrl,
  rating = 5,
  styles = {}
}) => {
  return (
    <div 
      className="w-full h-full bg-white p-8 rounded-lg shadow-lg border"
      style={styles}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <blockquote className="text-lg text-gray-700 mb-6 italic">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center">
        <Avatar className="mr-4">
          <AvatarImage src={avatarUrl} alt={author} />
          <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-gray-600">{role} at {company}</div>
        </div>
      </div>
    </div>
  );
};
