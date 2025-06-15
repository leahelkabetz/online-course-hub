

import React, { useEffect, useState, useMemo } from 'react';
import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Slider,
  Paper,
  Button,
  InputAdornment,
  OutlinedInput,
  Card
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'; // בתחילת הקובץ

import InfiniteScroll from 'react-infinite-scroll-component';
import CourseCard from '../Components/CourseCard';
import { colors, fonts } from '../styles/theme';
import { string } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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
  const [filters, setFilters] = useState<{
    search: string;
    categories: string[];
    priceRange: [number, number];
  }>({
    search: '',
    categories: [], // מערך ריק, מוגדר כ־string[]
    priceRange: [0, 500],
  });
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const pageSize = 20;

  const handleFilterChange = (field: string, value: any) => {
    setDisplayedCourses([]);
    setCurrentIndex(0);
    setHasMore(true);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', categories: [], priceRange: [0, 500] });
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesSearch =
        c.title.includes(filters.search) || c.description.includes(filters.search);

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(c.category);

      const matchesPrice =
        c.price >= filters.priceRange[0] && c.price <= filters.priceRange[1];

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

  // useEffect(() => {
  //   setDisplayedCourses([]);
  //   setCurrentIndex(0);
  //   setHasMore(true);
  // }, [filters]);

  // useEffect(() => {
  //   loadMore();
  // }, [filters]);
  useEffect(() => {
    setDisplayedCourses([]);
    setCurrentIndex(0);
    setHasMore(true);

    // קורא את הדף הראשון באופן מיידי
    const next = filteredCourses.slice(0, pageSize);
    setDisplayedCourses(next);
    setCurrentIndex(pageSize);
    if (pageSize >= filteredCourses.length) {
      setHasMore(false);
    }
  }, [filters, filteredCourses]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 2, mt: 4 }}>
      <div
        // elevation={2}
        style={{
          minWidth: 320,
          maxWidth: 380,
          fontFamily: fonts?.base || 'inherit',
          // color: colors?.Black || 'inherit',
          position: 'sticky',
          top: 100,
          alignSelf: 'flex-start',
          height: 'fit-content',
          marginTop: 12
        }}
      >

        <TextField
          fullWidth
          placeholder="חיפוש חופשי"
          variant="outlined"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
            inputProps: {
              dir: 'rtl',
              style: { textAlign: 'right' },
            },
          }}
          sx={{ mb: 3, mt: 6, direction: 'rtl' }}
        />

        <FormControl fullWidth>

          <Select
            labelId="categories-label"
            multiple
            displayEmpty
            value={filters.categories}
            onChange={(e) => handleFilterChange('categories', e.target.value)}
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <span
                  style={{
                    color: '#aaa',
                    direction: 'rtl',
                    textAlign: 'right',
                    display: 'block', // חובה כדי ש-textAlign יעבוד
                    width: '100%',    // כדי שהיישור יתפוס את כל השורה
                  }}
                >בחר קטגוריות</span>;
              }
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, direction: 'rtl' }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              );
            }}
            inputProps={{ dir: 'rtl' }}
          >

            <MenuItem dir='rtl' value="פיתוח תוכנה">פיתוח תוכנה</MenuItem>
            <MenuItem dir='rtl' value="עיצוב">עיצוב</MenuItem>
            <MenuItem dir='rtl' value="שיווק">שיווק</MenuItem>
          </Select>

        </FormControl>
        <Slider
          value={filters.priceRange}
          onChange={(_, val) => handleFilterChange('priceRange', val)}
          valueLabelDisplay="on"
          min={0}
          max={500}
          step={10}
          sx={{
            mb: 3,
            mt: 5,
            direction: 'ltr',
            color: colors.Primary, // צבע הסליידר כולו (track + thumb)
            '& .MuiSlider-thumb': {
              backgroundColor: colors.AccentLight,
            },
            '& .MuiSlider-track': {
              backgroundColor: colors.Primary,
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'transparent',
              color: colors.Primary,
              fontWeight: 'bold',
            },
          }}
        />
        <Button onClick={resetFilters} fullWidth sx={{ color: colors.Primary, textAlign: 'right' }}>
          איפוס מסננים
        </Button>
      </div>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {/* {isAdmin && ( */}
        <Box
          sx={{
            width: {
              xs: '90%',
              sm: '45%',
              md: '30%',
              lg: '22%',
            },
            minWidth: 250,
          }}
        >

          <Card
            sx={{
              height: 250,
              border: `2px dashed ${colors.Primary}`,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              p: 2,
              mt: 6,
              mr: 10,
              textAlign: 'center',
              fontFamily: fonts.base,
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => console.log('מעבר לטופס הוספת קורס')}
          >
            <AddIcon sx={{ fontSize: 40, color: colors.Primary, mb: 1 }} />
            <Typography variant="subtitle1" color={colors.Primary} fontWeight="bold">
              הוספת קורס חדש
            </Typography>
          </Card>
        </Box>
        {/* )} */}

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
              minWidth: 250,
            }}
          >
            <CourseCard {...course} isAdmin={isAdmin} />
          </Box>
        ))}
      </Box>

    </Box>
  );
};

export default CoursesPage;
