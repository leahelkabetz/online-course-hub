// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import CourseCard from '../Components/CourseCard';
// import AddCourseDialog from '../Components/AddCourseDialog';
// import { getAllCategories, getPriceRange, getFilteredCourses } from '../api/coursesApi';
// import { colors, fonts } from '../styles/theme';
// import FilterSidebar from '../Components/FilterSidebar';

// export type Course = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
// };

// const CoursesPage: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 1000]);
//   const [filters, setFilters] = useState<{ search: string; categories: string[]; priceRange: [number, number]; }>({
//     search: '',
//     categories: [],
//     priceRange: [0, 1000],
//   });

//   const pageSize = 20;
//   const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

//   const fetchInitialData = async () => {
//     try {
//       const [catRes, priceRes] = await Promise.all([
//         getAllCategories(),
//         getPriceRange()
//       ]);
//       setCategories(catRes.data);
//       setPriceLimits([priceRes.data.min, priceRes.data.max]);
//       setFilters(prev => ({ ...prev, priceRange: [priceRes.data.min, priceRes.data.max] }));
//     } catch (err) {
//       console.error('שגיאה בטעינת קטגוריות או טווח מחירים:', err);
//     }
//   };

//   const fetchCourses = async (filtersToSend = filters) => {
//     try {
//       const res = await getFilteredCourses(filtersToSend);
//       setCourses(res.data);
//       setDisplayedCourses(res.data.slice(0, pageSize));
//       setCurrentIndex(pageSize);
//       setHasMore(res.data.length > pageSize);
//     } catch (err) {
//       console.error('שגיאה בשליפת קורסים:', err);
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//     fetchCourses();
//   }, []);

//   const handleFilterChange = (field: string, value: any) => {
//     const newFilters = { ...filters, [field]: value };
//     setFilters(newFilters);
//     fetchCourses(newFilters);
//   };

//   const resetFilters = () => {
//     const newFilters = { search: '', categories: [], priceRange: priceLimits };
//     setFilters(newFilters);
//     fetchCourses(newFilters);
//   };

//   const loadMore = () => {
//     const next = courses.slice(currentIndex, currentIndex + pageSize);
//     setDisplayedCourses(prev => [...prev, ...next]);
//     setCurrentIndex(currentIndex + pageSize);
//     if (currentIndex + pageSize >= courses.length) {
//       setHasMore(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 2, mt: 10, mb: 5 }}>
//       <FilterSidebar
//         filters={filters}
//         categories={categories}
//         priceLimits={priceLimits}
//         onFilterChange={handleFilterChange}
//         onReset={resetFilters}
//       />

//       <InfiniteScroll
//         dataLength={displayedCourses.length}
//         next={loadMore}
//         hasMore={hasMore}
//         loader={<Typography textAlign="center" mt={2}>טוען עוד קורסים...</Typography>}
//         style={{ overflow: 'visible', width: '100%' }}
//       >
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
//           {isAdmin && (
//             <AddCourseDialog onCourseAdded={() => fetchCourses()} />
//           )}

//           {displayedCourses.map((course, i) => (
//             <Box key={i} sx={{ width: { xs: '100%', sm: '45%', md: '30%', lg: '22%' }, minWidth: 250 }}>
//               <CourseCard course={course} onDeleted={() => fetchCourses()} onEdited={() => fetchCourses()} />
//             </Box>
//           ))}
//         </Box>
//       </InfiniteScroll>
//     </Box>
//   );
// };

// export default CoursesPage;











import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import CourseCard from '../Components/CourseCard';
import AddCourseDialog from '../Components/AddCourseDialog';
import { getAllCategories, getPriceRange, getFilteredCourses, getAllProducts } from '../api/coursesApi';
import { colors, fonts } from '../styles/theme';
import FilterSidebar from '../Components/FilterSidebar';
import { Course } from '../models/course';



const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [categories, setCategories] = useState<string[]>([]);
  const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState<{
    search: string;
    categories: string[];
    priceRange: [number, number];
  }>({
    search: '',
    categories: [],
    priceRange: [0, 1000],
  });

  const pageSize = 20;
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const fetchCourses = async () => {
    try {
      const res = await getAllProducts(); // שליפה בלי פילטרים
      setCourses(res.data);
      setDisplayedCourses(res.data.slice(0, pageSize));
      setCurrentIndex(pageSize);
      setHasMore(res.data.length > pageSize);
    } catch (err) {
      console.error('שגיאה בשליפת קורסים:', err);
    }
  };
  
  useEffect(() => {
    fetchCourses(); // שליפה עם טעינת הקומפוננטה
  }, []);

  // עדכון טווח מחירים וקטגוריות
  const refreshFilterOptions = async () => {
    try {
      const [catRes, priceRes] = await Promise.all([
        getAllCategories(),
        getPriceRange(),
      ]);
      setCategories(catRes.data);
      setPriceLimits([priceRes.data.min, priceRes.data.max]);
      setFilters((prev) => ({
        ...prev,
        priceRange: [priceRes.data.min, priceRes.data.max],
      }));
    } catch (err) {
      console.error('שגיאה בטעינת קטגוריות או טווח מחירים:', err);
    }
  };

  // const fetchCourses = async (filtersToSend = filters) => {
  //   try {
  //     const res = await getFilteredCourses(filtersToSend);
  //     setCourses(res.data);
  //     setDisplayedCourses(res.data.slice(0, pageSize));
  //     setCurrentIndex(pageSize);
  //     setHasMore(res.data.length > pageSize);
  //   } catch (err) {
  //     console.error('שגיאה בשליפת קורסים:', err);
  //   }
  // };
  //  const fetchCourses = async (filtersToSend = filters) => {
  //     try {
  //       const res = await getAllProducts();
  //       setCourses(res.data);

  //     } catch (err) {
  //       console.error('שגיאה בשליפת קורסים:', err);
  //     }
  //   };
  //   useEffect(() => {
  //     const init = async () => {
  //       await refreshFilterOptions();
  //       await fetchCourses();
  //     };
  //     init();
  //   }, []);

  //   const handleFilterChange = (field: string, value: any) => {
  //     const newFilters = { ...filters, [field]: value };
  //     setFilters(newFilters);
  //     fetchCourses(newFilters);
  //   };

  const resetFilters = () => {
    const newFilters = {
      search: '',
      categories: [],
      priceRange: priceLimits,
    };
    setFilters(newFilters);
    //fetchCourses(newFilters);
  };

  const loadMore = () => {
    const next = courses.slice(currentIndex, currentIndex + pageSize);
    setDisplayedCourses((prev) => [...prev, ...next]);
    setCurrentIndex(currentIndex + pageSize);
    if (currentIndex + pageSize >= courses.length) {
      setHasMore(false);
    }
  };


  const handleCourseAdded = async () => {
    await refreshFilterOptions();  // קודם כל נרענן את הקטגוריות והטווח
    await fetchCourses();          // ואז נטען קורסים לפי הפילטרים החדשים
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 2, mt: 10, mb: 5 }}>
      {/* <FilterSidebar
        filters={filters}
        categories={categories}
        priceLimits={priceLimits}
        //onFilterChange={handleFilterChange}
        onReset={resetFilters}
      /> */}

      <InfiniteScroll
        dataLength={displayedCourses.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Typography textAlign="center" mt={2}>טוען עוד קורסים...</Typography>}
        style={{ overflow: 'visible', width: '100%' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {isAdmin && (
            <AddCourseDialog onCourseAdded={handleCourseAdded} />
          )}

          {displayedCourses.map((c, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                minWidth: 250,
              }}
            >
              <CourseCard
                course={c}
                onDeleted={fetchCourses} // יופעל אחרי מחיקה
                onEdited={fetchCourses}  // יופעל אחרי עדכון
              />

            </Box>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default CoursesPage;
