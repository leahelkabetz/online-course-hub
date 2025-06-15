
// // // // import React, { useEffect, useState } from 'react';
// // // // import { Typography, Box } from '@mui/material';
// // // // import InfiniteScroll from 'react-infinite-scroll-component';
// // // // import CourseCard from '../Components/CourseCard';

// // // // const allCourses = Array.from({ length: 100 }, (_, i) => ({
// // // //   title: `קורס מספר ${i + 1}`,
// // // //   category: 'פיתוח תוכנה',
// // // //   description: 'תיאור של קורס מעולה עם המון ערך מקצועי',
// // // //   price: 250 + (i % 5) * 10,
// // // //   students: 30 + i,
// // // //   rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
// // // //   badge: i % 2 === 0 ? 'פופולרי' : undefined,
// // // //   image: '',
// // // // }));

// // // // const CoursesPage: React.FC = () => {
// // // //   const [courses, setCourses] = useState<any[]>([]);
// // // //   const [hasMore, setHasMore] = useState(true);
// // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // //   const pageSize = 20;

// // // //   const loadMore = () => {
// // // //     const next = allCourses.slice(currentIndex, currentIndex + pageSize);
// // // //     setCourses((prev) => [...prev, ...next]);
// // // //     setCurrentIndex(currentIndex + pageSize);
// // // //     if (currentIndex + pageSize >= allCourses.length) {
// // // //       setHasMore(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadMore();
// // // //   }, []);

// // // //   return (
// // // //     <Box sx={{ mt: 4, px: 2 }}>
      

// // // //       <InfiniteScroll
// // // //         dataLength={courses.length}
// // // //         next={loadMore}
// // // //         hasMore={hasMore}
// // // //         loader={<Typography align="center">טוען עוד קורסים...</Typography>}
// // // //         endMessage={
// // // //           <Typography align="center" sx={{ mt: 2 }}>
// // // //             אין עוד קורסים להצגה 🎉
// // // //           </Typography>
// // // //         }
// // // //       >
// // // //         <Box
// // // //           sx={{
// // // //             display: 'flex',
// // // //             flexWrap: 'wrap',
// // // //             gap: 3,
// // // //             justifyContent: 'center',
// // // //           }}
// // // //         >
// // // //           {courses.map((course, i) => (
// // // //             <Box
// // // //               key={i}
// // // //               sx={{
// // // //                 width: {
// // // //                   xs: '100%',       // מסך צר
// // // //                   sm: '45%',        // טאבלט
// // // //                   md: '30%',        // מחשב רגיל
// // // //                   lg: '22%',        // מחשב רחב
// // // //                 },
// // // //                 minWidth: 260,
// // // //               }}
// // // //             >
// // // //               <CourseCard {...course} />
// // // //             </Box>
// // // //           ))}
// // // //         </Box>
// // // //       </InfiniteScroll>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CoursesPage;

// // // import React, { useEffect, useState, useMemo } from 'react';
// // // import {
// // //   Typography,
// // //   Box,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   InputLabel,
// // //   FormControl,
// // //   Slider,
// // // } from '@mui/material';
// // // import InfiniteScroll from 'react-infinite-scroll-component';
// // // import CourseCard from '../Components/CourseCard';

// // // // מקור נתונים
// // // const allCourses = Array.from({ length: 100 }, (_, i) => ({
// // //   title: `קורס מספר ${i + 1}`,
// // //   category: i % 3 === 0 ? 'פיתוח תוכנה' : i % 3 === 1 ? 'עיצוב' : 'שיווק',
// // //   description: 'תיאור של קורס מעולה עם המון ערך מקצועי',
// // //   price: 200 + (i % 5) * 50,
// // //   students: 30 + i,
// // //   rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
// // //   badge: i % 2 === 0 ? 'פופולרי' : undefined,
// // //   image: '',
// // // }));

// // // const CoursesPage: React.FC = () => {
// // //   const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
// // //   const [hasMore, setHasMore] = useState(true);
// // //   const [currentIndex, setCurrentIndex] = useState(0);
// // //   const [filters, setFilters] = useState({
// // //     search: '',
// // //     category: '',
// // //     priceRange: [0, 500],
// // //   });

// // //   const pageSize = 20;

// // //   const handleFilterChange = (field: string, value: any) => {
// // //     setDisplayedCourses([]);
// // //     setCurrentIndex(0);
// // //     setHasMore(true);
// // //     setFilters((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const filteredCourses = useMemo(() => {
// // //     return allCourses.filter((c) => {
// // //       const matchesSearch =
// // //         c.title.includes(filters.search) || c.description.includes(filters.search);
// // //       const matchesCategory = !filters.category || c.category === filters.category;
// // //       const matchesPrice = c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1];
// // //       return matchesSearch && matchesCategory && matchesPrice;
// // //     });
// // //   }, [filters]);

// // //   const loadMore = () => {
// // //     const next = filteredCourses.slice(currentIndex, currentIndex + pageSize);
// // //     setDisplayedCourses((prev) => [...prev, ...next]);
// // //     setCurrentIndex(currentIndex + pageSize);
// // //     if (currentIndex + pageSize >= filteredCourses.length) {
// // //       setHasMore(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     setDisplayedCourses([]);
// // //     setCurrentIndex(0);
// // //     setHasMore(true);
// // //   }, [filters]);

// // //   useEffect(() => {
// // //     loadMore();
// // //   }, [filters]);

// // //   return (
// // //     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 2, mt: 4 }}>
// // //       {/* סינון צדדי */}
// // //       <Box sx={{ width: { xs: '100%', md: '250px' }, mb: { xs: 4, md: 0 }, mr: { md: 4 } }}>
// // //         <Typography variant="h6" gutterBottom>
// // //           סינון קורסים
// // //         </Typography>

// // //         <TextField
// // //           fullWidth
// // //           label="חיפוש"
// // //           variant="outlined"
// // //           value={filters.search}
// // //           onChange={(e) => handleFilterChange('search', e.target.value)}
// // //           sx={{ mb: 2 }}
// // //         />

// // //         <FormControl fullWidth sx={{ mb: 2 }}>
// // //           <InputLabel>קטגוריה</InputLabel>
// // //           <Select
// // //             value={filters.category}
// // //             label="קטגוריה"
// // //             onChange={(e) => handleFilterChange('category', e.target.value)}
// // //           >
// // //             <MenuItem value="">הכול</MenuItem>
// // //             <MenuItem value="פיתוח תוכנה">פיתוח תוכנה</MenuItem>
// // //             <MenuItem value="עיצוב">עיצוב</MenuItem>
// // //             <MenuItem value="שיווק">שיווק</MenuItem>
// // //           </Select>
// // //         </FormControl>

// // //         <Typography gutterBottom>טווח מחירים</Typography>
// // //         <Slider
// // //           value={filters.priceRange}
// // //           onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
// // //           valueLabelDisplay="auto"
// // //           min={0}
// // //           max={500}
// // //         />
// // //       </Box>

// // //       {/* אזור תצוגת קורסים */}
// // //       <Box sx={{ flexGrow: 1 }}>
// // //         <InfiniteScroll
// // //           dataLength={displayedCourses.length}
// // //           next={loadMore}
// // //           hasMore={hasMore}
// // //           loader={<Typography align="center">טוען עוד קורסים...</Typography>}
// // //           endMessage={
// // //             <Typography align="center" sx={{ mt: 2 }}>
// // //               אין עוד קורסים להצגה 🎉
// // //             </Typography>
// // //           }
// // //         >
// // //           <Box
// // //             sx={{
// // //               display: 'flex',
// // //               flexWrap: 'wrap',
// // //               gap: 3,
// // //               justifyContent: 'center',
// // //             }}
// // //           >
// // //             {displayedCourses.map((course, i) => (
// // //               <Box
// // //                 key={i}
// // //                 sx={{
// // //                   width: {
// // //                     xs: '100%',
// // //                     sm: '45%',
// // //                     md: '30%',
// // //                     lg: '22%',
// // //                   },
// // //                   minWidth: 260,
// // //                 }}
// // //               >
// // //                 <CourseCard {...course} />
// // //               </Box>
// // //             ))}
// // //           </Box>
// // //         </InfiniteScroll>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default CoursesPage;
// // import React, { useEffect, useState, useMemo } from 'react';
// // import {
// //   Typography,
// //   Box,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Slider,
// //   Paper,
// // } from '@mui/material';
// // import InfiniteScroll from 'react-infinite-scroll-component';
// // import CourseCard from '../Components/CourseCard';
// // import { colors, fonts } from '../styles/theme'; // אם יש לך

// // // נתונים לדוגמה
// // const allCourses = Array.from({ length: 100 }, (_, i) => ({
// //   title: `קורס מספר ${i + 1}`,
// //   category: i % 3 === 0 ? 'פיתוח תוכנה' : i % 3 === 1 ? 'עיצוב' : 'שיווק',
// //   description: 'תיאור של קורס מעולה עם המון ערך מקצועי',
// //   price: 200 + (i % 5) * 50,
// //   students: 30 + i,
// //   rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
// //   badge: i % 2 === 0 ? 'פופולרי' : undefined,
// //   image: '',
// // }));

// // const CoursesPage: React.FC = () => {
// //   const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [filters, setFilters] = useState({
// //     search: '',
// //     category: '',
// //     priceRange: [0, 500],
// //   });

// //   const pageSize = 20;

// //   const handleFilterChange = (field: string, value: any) => {
// //     setDisplayedCourses([]);
// //     setCurrentIndex(0);
// //     setHasMore(true);
// //     setFilters((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const filteredCourses = useMemo(() => {
// //     return allCourses.filter((c) => {
// //       const matchesSearch =
// //         c.title.includes(filters.search) || c.description.includes(filters.search);
// //       const matchesCategory = !filters.category || c.category === filters.category;
// //       const matchesPrice = c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1];
// //       return matchesSearch && matchesCategory && matchesPrice;
// //     });
// //   }, [filters]);

// //   const loadMore = () => {
// //     const next = filteredCourses.slice(currentIndex, currentIndex + pageSize);
// //     setDisplayedCourses((prev) => [...prev, ...next]);
// //     setCurrentIndex(currentIndex + pageSize);
// //     if (currentIndex + pageSize >= filteredCourses.length) {
// //       setHasMore(false);
// //     }
// //   };

// //   useEffect(() => {
// //     setDisplayedCourses([]);
// //     setCurrentIndex(0);
// //     setHasMore(true);
// //   }, [filters]);

// //   useEffect(() => {
// //     loadMore();
// //   }, [filters]);

// //   return (
// //     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 2, mt: 4 }}>
// //       {/* צד סינון – בעיצוב נקי כמו בתמונה */}
// //       <Paper
// //         elevation={1}
// //         sx={{
// //           width: { xs: '100%', md: '260px' },
// //           p: 3,
// //           mb: { xs: 4, md: 0 },
// //           mr: { md: 4 },
// //           borderRadius: 3,
// //         }}
// //       >
// //         <Typography
// //           variant="h6"
// //           fontWeight="bold"
// //           sx={{ mb: 2, fontFamily: fonts?.heading || 'inherit' }}
// //         >
// //           סינון קורסים
// //         </Typography>

// //         <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
// //           <TextField
// //             placeholder="מ-"
// //             size="small"
// //             type="number"
// //             value={filters.priceRange[0]}
// //             onChange={(e) =>
// //               handleFilterChange('priceRange', [
// //                 +e.target.value || 0,
// //                 filters.priceRange[1],
// //               ])
// //             }
// //             sx={{
// //               flex: 1,
// //               borderRadius: 30,
// //               backgroundColor: '#f5f5f5',
// //               input: { textAlign: 'center' },
// //             }}
// //           />
// //           <TextField
// //             placeholder="עד"
// //             size="small"
// //             type="number"
// //             value={filters.priceRange[1]}
// //             onChange={(e) =>
// //               handleFilterChange('priceRange', [
// //                 filters.priceRange[0],
// //                 +e.target.value || 0,
// //               ])
// //             }
// //             sx={{
// //               flex: 1,
// //               borderRadius: 30,
// //               backgroundColor: '#f5f5f5',
// //               input: { textAlign: 'center' },
// //             }}
// //           />
// //         </Box>

// //         <FormControl fullWidth sx={{ mb: 3 }}>
// //           <InputLabel>קטגוריה</InputLabel>
// //           <Select
// //             value={filters.category}
// //             label="קטגוריה"
// //             onChange={(e) => handleFilterChange('category', e.target.value)}
// //           >
// //             <MenuItem value="">הכול</MenuItem>
// //             <MenuItem value="פיתוח תוכנה">פיתוח תוכנה</MenuItem>
// //             <MenuItem value="עיצוב">עיצוב</MenuItem>
// //             <MenuItem value="שיווק">שיווק</MenuItem>
// //           </Select>
// //         </FormControl>

// //         <TextField
// //           fullWidth
// //           placeholder="חיפוש חופשי"
// //           variant="outlined"
// //           value={filters.search}
// //           onChange={(e) => handleFilterChange('search', e.target.value)}
// //           sx={{
// //             borderRadius: 3,
// //             backgroundColor: '#f5f5f5',
// //             input: { fontFamily: fonts?.base || 'inherit' },
// //           }}
// //         />
// //       </Paper>

// //       {/* תצוגת קורסים */}
// //       <Box sx={{ flexGrow: 1 }}>
// //         <InfiniteScroll
// //           dataLength={displayedCourses.length}
// //           next={loadMore}
// //           hasMore={hasMore}
// //           loader={<Typography align="center">טוען עוד קורסים...</Typography>}
// //           endMessage={
// //             <Typography align="center" sx={{ mt: 2 }}>
// //               אין עוד קורסים להצגה 🎉
// //             </Typography>
// //           }
// //         >
// //           <Box
// //             sx={{
// //               display: 'flex',
// //               flexWrap: 'wrap',
// //               gap: 3,
// //               justifyContent: 'center',
// //             }}
// //           >
// //             {displayedCourses.map((course, i) => (
// //               <Box
// //                 key={i}
// //                 sx={{
// //                   width: {
// //                     xs: '100%',
// //                     sm: '45%',
// //                     md: '30%',
// //                     lg: '22%',
// //                   },
// //                   minWidth: 260,
// //                 }}
// //               >
// //                 <CourseCard {...course} />
// //               </Box>
// //             ))}
// //           </Box>
// //         </InfiniteScroll>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default CoursesPage;
// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Typography,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Slider,
//   Paper,
// } from '@mui/material';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import CourseCard from '../Components/CourseCard';
// import { colors, fonts } from '../styles/theme';

// // מקור נתונים
// const allCourses = Array.from({ length: 100 }, (_, i) => ({
//   title: `קורס מספר ${i + 1}`,
//   category: i % 3 === 0 ? 'פיתוח תוכנה' : i % 3 === 1 ? 'עיצוב' : 'שיווק',
//   description: 'תיאור של קורס מעולה עם המון ערך מקצועי',
//   price: 200 + (i % 5) * 50,
//   students: 30 + i,
//   rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
//   badge: i % 2 === 0 ? 'פופולרי' : undefined,
//   image: '',
// }));

// const CoursesPage: React.FC = () => {
//   const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     priceRange: [0, 500],
//   });

//   const pageSize = 20;

//   const handleFilterChange = (field: string, value: any) => {
//     setDisplayedCourses([]);
//     setCurrentIndex(0);
//     setHasMore(true);
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const filteredCourses = useMemo(() => {
//     return allCourses.filter((c) => {
//       const matchesSearch =
//         c.title.includes(filters.search) || c.description.includes(filters.search);
//       const matchesCategory = !filters.category || c.category === filters.category;
//       const matchesPrice = c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1];
//       return matchesSearch && matchesCategory && matchesPrice;
//     });
//   }, [filters]);

//   const loadMore = () => {
//     const next = filteredCourses.slice(currentIndex, currentIndex + pageSize);
//     setDisplayedCourses((prev) => [...prev, ...next]);
//     setCurrentIndex(currentIndex + pageSize);
//     if (currentIndex + pageSize >= filteredCourses.length) {
//       setHasMore(false);
//     }
//   };

//   useEffect(() => {
//     setDisplayedCourses([]);
//     setCurrentIndex(0);
//     setHasMore(true);
//   }, [filters]);

//   useEffect(() => {
//     loadMore();
//   }, [filters]);

//   return (
//     <Box sx={{ px: 2, mt: 4, direction: 'rtl' }}>
//       {/* 🔹 סינון בראש הדף */}
//       <Paper
//         elevation={1}
//         sx={{
//           mb: 4,
//           p: 3,
//           borderRadius: 3,
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: 2,
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <TextField
//           label="חיפוש חופשי"
//           variant="outlined"
//           value={filters.search}
//           onChange={(e) => handleFilterChange('search', e.target.value)}
//           sx={{ minWidth: 200 }}
//         />

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>קטגוריה</InputLabel>
//           <Select
//             value={filters.category}
//             label="קטגוריה"
//             onChange={(e) => handleFilterChange('category', e.target.value)}
//           >
//             <MenuItem value="">הכל</MenuItem>
//             <MenuItem value="פיתוח תוכנה">פיתוח תוכנה</MenuItem>
//             <MenuItem value="עיצוב">עיצוב</MenuItem>
//             <MenuItem value="שיווק">שיווק</MenuItem>
//           </Select>
//         </FormControl>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
//           <Typography>מחיר:</Typography>
//           <TextField
//             placeholder="מ-"
//             size="small"
//             type="number"
//             value={filters.priceRange[0]}
//             onChange={(e) =>
//               handleFilterChange('priceRange', [
//                 +e.target.value || 0,
//                 filters.priceRange[1],
//               ])
//             }
//             sx={{ width: 80 }}
//           />
//           <TextField
//             placeholder="עד"
//             size="small"
//             type="number"
//             value={filters.priceRange[1]}
//             onChange={(e) =>
//               handleFilterChange('priceRange', [
//                 filters.priceRange[0],
//                 +e.target.value || 0,
//               ])
//             }
//             sx={{ width: 80 }}
//           />
//         </Box>
//       </Paper>

//       {/* 🔹 תצוגת קורסים */}
//       <InfiniteScroll
//         dataLength={displayedCourses.length}
//         next={loadMore}
//         hasMore={hasMore}
//         loader={<Typography align="center">טוען עוד קורסים...</Typography>}
//         endMessage={
//           <Typography align="center" sx={{ mt: 2 }}>
//             אין עוד קורסים להצגה 🎉
//           </Typography>
//         }
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 3,
//             justifyContent: 'center',
//           }}
//         >
//           {displayedCourses.map((course, i) => (
//             <Box
//               key={i}
//               sx={{
//                 width: {
//                   xs: '100%',
//                   sm: '45%',
//                   md: '30%',
//                   lg: '22%',
//                 },
//                 minWidth: 260,
//               }}
//             >
//               <CourseCard {...course} />
//             </Box>
//           ))}
//         </Box>
//       </InfiniteScroll>
//     </Box>
//   );
// };

// export default CoursesPage;
import React, { useEffect, useState, useMemo } from 'react';
import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Paper,
  Divider,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CourseCard from '../Components/CourseCard';
import { colors, fonts } from '../styles/theme';

const allCourses = Array.from({ length: 100 }, (_, i) => ({
  title: `קורס מספר ${i + 1}`,
  category: i % 3 === 0 ? 'פיתוח תוכנה' : i % 3 === 1 ? 'עיצוב' : 'שיווק',
  description: 'תיאור של קורס מעולה עם המון ערך מקצועי',
  price: 200 + (i % 5) * 50,
  students: 30 + i,
  rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
  badge: i % 2 === 0 ? 'פופולרי' : undefined,
  image: '',
}));

const CoursesPage: React.FC = () => {
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: [0, 500],
  });

  const pageSize = 20;

  const handleFilterChange = (field: string, value: any) => {
    setDisplayedCourses([]);
    setCurrentIndex(0);
    setHasMore(true);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesSearch =
        c.title.includes(filters.search) || c.description.includes(filters.search);
      const matchesCategory = !filters.category || c.category === filters.category;
      const matchesPrice = c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [filters]);

  const loadMore = () => {
    const next = filteredCourses.slice(currentIndex, currentIndex + pageSize);
    setDisplayedCourses((prev) => [...prev, ...next]);
    setCurrentIndex(currentIndex + pageSize);
    if (currentIndex + pageSize >= filteredCourses.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setDisplayedCourses([]);
    setCurrentIndex(0);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    loadMore();
  }, [filters]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 2, mt: 4 }}>
      {/* 🔹 סינון בצד ימין */}
      <Paper
        elevation={2}
        sx={{
          width: 260,
          p: 3,
          borderRadius: 4,
          fontFamily: fonts?.base || 'inherit',
          color: colors?.Black || 'inherit',
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          סינון קורסים
        </Typography>

        {/* חיפוש */}
        <TextField
          fullWidth
          label="חיפוש חופשי"
          variant="outlined"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          sx={{ mb: 3 }}
          inputProps={{ dir: 'rtl' }}
        />

        {/* קטגוריה */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>קטגוריה</InputLabel>
          <Select
            value={filters.category}
            label="קטגוריה"
            onChange={(e) => handleFilterChange('category', e.target.value)}
            inputProps={{ dir: 'rtl' }}
          >
            <MenuItem value="">הכל</MenuItem>
            <MenuItem value="פיתוח תוכנה">פיתוח תוכנה</MenuItem>
            <MenuItem value="עיצוב">עיצוב</MenuItem>
            <MenuItem value="שיווק">שיווק</MenuItem>
          </Select>
        </FormControl>

        {/* טווח מחירים */}
        <Typography gutterBottom>טווח מחירים</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, val) => handleFilterChange('priceRange', val)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="מ-"
            size="small"
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) =>
              handleFilterChange('priceRange', [+e.target.value || 0, filters.priceRange[1]])
            }
            fullWidth
            inputProps={{ dir: 'rtl', min: 0 }}
          />
          <TextField
            placeholder="עד"
            size="small"
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange('priceRange', [filters.priceRange[0], +e.target.value || 0])
            }
            fullWidth
            inputProps={{ dir: 'rtl', min: 0 }}
          />
        </Box>
      </Paper>

      {/* 🔹 קורסים */}
      <Box sx={{ flexGrow: 1, pr: { md: 4 } }}>
        <InfiniteScroll
          dataLength={displayedCourses.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<Typography align="center">טוען עוד קורסים...</Typography>}
          endMessage={
            <Typography align="center" sx={{ mt: 2 }}>
              אין עוד קורסים להצגה 🎉
            </Typography>
          }
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {displayedCourses.map((course, i) => (
              <Box
                key={i}
                sx={{
                  width: {
                    xs: '100%',
                    sm: '45%',
                    md: '30%',
                    lg: '22%',
                  },
                  minWidth: 260,
                }}
              >
                <CourseCard {...course} />
              </Box>
            ))}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default CoursesPage;
