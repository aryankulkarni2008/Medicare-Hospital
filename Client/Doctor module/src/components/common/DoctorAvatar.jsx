import React from 'react';

const getInitials = (name) => {
  if (!name) return 'DR';
  const nameParts = name.trim().split(' ').filter(Boolean);
  if (nameParts.length === 0) return 'DR';
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};

export default function DoctorAvatar({ name, photo, className, alt }) {
  const isDefaultUnsplash = photo && photo.includes('unsplash.com');
  const hasValidPhoto = photo && !isDefaultUnsplash && photo.trim() !== '';

  if (hasValidPhoto) {
    return <img src={photo} alt={alt || name} className={className} />;
  }

  // Inherit dimensions and rounded styles from className if possible,
  // while adding flex center, background, and text color.
  return (
    <div 
      className={`${className || ''} flex items-center justify-center bg-[#E6F4FA] text-[#2490C9] font-bold overflow-hidden`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
