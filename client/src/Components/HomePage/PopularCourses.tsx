
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import CourseCard from '../CourseCard';
import { colors, fonts } from '../../styles/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const courses = [
    {
        title: 'עיצוב גרפי מקצועי',
        category: 'עיצוב',
        description: 'ללמוד את יסודות העיצוב הגרפי עם Adobe Creative Suite',
        price: 599,
        students: 65,
        rating: 4.8,
        badge: 'חדש',
        image: '/logo-placeholder.png',
    },
    {
        title: 'שיווק דיגיטלי למתחילים',
        category: 'שיווק',
        description: 'אסטרטגיות שיווק מתקדמות לעסקים קטנים ובינוניים',
        price: 399,
        students: 85,
        rating: 4.7,
        badge: '',
        image: '/logo-placeholder.png',
    },
    {
        title: 'פיתוח אתרים מתקדם',
        category: 'פיתוח תוכנה',
        description: 'ללמוד לבנות אתרים מקצועיים עם React ו-Node.js',
        price: 499,
        students: 120,
        rating: 4.9,
        badge: 'פופולרי',
        image: '/logo-placeholder.png',
    },
    {
        title: 'עיצוב UX/UI',
        category: 'עיצוב',
        description: 'עקרונות עיצוב ממשקים וחווית משתמש אפקטיבית',
        price: 459,
        students: 72,
        rating: 4.6,
        badge: '',
        image: '/logo-placeholder.png',
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    arrows: true,
    swipeToSlide: true,       // ✅ מאפשר החלקה ידנית חלקה
    autoplay: true,           // ✅ הפעלה אוטומטית
    autoplaySpeed: 2000,      // ⏱️ כל 2 שניות
    pauseOnHover: true,       // ⏸️ עוצר כשעוברים עם העכבר
    responsive: [
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

export default function PopularCoursesCarousel() {
    return (
        <Box sx={{ px: 1, py: 1, direction: 'rtl', mt: 0, mb: 8, maxHeight: 500 }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                fontFamily={fonts.heading}
                mb={3}
                sx={{ textAlign: 'right' }}
            >
                הקורסים המובילים
            </Typography>

            <Slider {...settings}>
                {courses.map((course, index) => (
                    <Box
                        key={index}
                        sx={{
                            px: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ maxWidth: 350, width: '100%' }}>
                            <CourseCard {...course} />
                        </Box>
                    </Box>
                ))}
            </Slider>

        </Box>
    );
}
