
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import CourseCard from '../CourseCard';
import { colors, fonts } from '../../styles/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  getTopRatedCourses } from '../../api/coursesApi'; // חשוב לוודא שזה הנתיב הנכון

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    arrows: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
    const [courses, setCourses] = useState<any[]>([]);

    const fetchCourses = async () => {
        try {
            const res = await getTopRatedCourses(); 
            setCourses(res.data);                    
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

   

    useEffect(() => {
        fetchCourses(); // שליפה עם טעינת הקומפוננטה
    }, []);

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
                {courses.map((c, index) => (
                    <Box
                        key={index}
                        sx={{
                            px: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ maxWidth: 350, width: '100%' }}>
                            <CourseCard course={c} onDeleted={fetchCourses} onEdited={fetchCourses}/>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
