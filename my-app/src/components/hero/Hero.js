import React from 'react';
import HeroImg1 from '../../assets/images/hero1.jpg';

const Hero = () => {
    return (
        <section
            style={{
                position: 'relative',
                height: '800px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff', // Light text color for contrast
                textAlign: 'center',
            }}
        >
            <img
                src={HeroImg1}
                alt="Hero Background"
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(5px)', // Blurs the image
                    zIndex: '-1', // Places image behind text
                }}
            />
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                    padding: '40px',
                    borderRadius: '8px',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                <h1 style={{
                    fontSize: '3rem', // Larger font size for emphasis
                    marginBottom: '1rem',
                    fontWeight: '700', // Bold text for prominence
                    color: 'white'
                }}>
                    Welcome to the University Cleaners System
                </h1>
                <p style={{
                    fontSize: '1.5rem', // Slightly larger text for better readability
                    margin: '0',
                    fontWeight: '550',
                }}>
                    Efficiently managing cleaners, complaints, tools, departments, supervisors, and tasks.
                </p>
            </div>
        </section>
    );
};

export default Hero;
