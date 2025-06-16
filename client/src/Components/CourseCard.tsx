import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { colors, fonts } from '../styles/theme';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import { deleteProduct } from '../api/coursesApi';
import { Course } from '../models/course';


interface CourseCardProps {
  course:Course,
  onDeleted:()=>void
}

const exampleReviews = [
  { name: 'שרה ל.', comment: 'קורס מצוין! למדתי המון', rating: 5 },
  { name: 'יעקב ש.', comment: 'מדריך ברור ומקצועי', rating: 4 },
];

export default function CourseCard({course,onDeleted}: CourseCardProps) {
  const [openReviews, setOpenReviews] = useState(false);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items || []);

  const handleEdit = () => {
    console.log("Edited");
  }
  const handleDelete = async () => {
    try{
      await deleteProduct(course.id);
      if (onDeleted) {
         onDeleted();
      }
    }
    catch (error) {
      console.error("Error deleting product:", error);
    }
  }
  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: `1px solid #eee`,
          borderRadius: 3,
          height: '100%',
          fontFamily: fonts.base,
          direction: 'rtl',
          p: 2,
          position: 'relative',
        }}
      >
        {course.badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: colors.AccentLight,
              color: '#fff',
              fontSize: 12,
              borderRadius: 8,
              px: 1.5,
              py: 0.5,
            }}
          >
            {course.badge}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            variant="square"
            src={course.image}
            sx={{ width: 120, height: 120, backgroundColor: '#f3f3f3' }}
          />
        </Box>

        <Typography variant="subtitle2" fontWeight="bold" color={colors.TextGrPrimaryay}>
          {course.category}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.Black, my: 0.5 }}>
          {course.title}
        </Typography>

        <Typography variant="body2" sx={{ color: colors.TextGrPrimaryay, mb: 2 }}>
          {course.description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <StarIcon sx={{ fontSize: 18, color: '#ffb400' }} />
            <Typography variant="body2" color="text.secondary">
              {course.rating}
            </Typography>
          </Stack>

          <Typography variant="body2" fontWeight="bold" color={colors.Primary}>
            ₪{course.price}
          </Typography>
        </Stack>


        <Stack spacing={1}>
          {isAdmin ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={handleEdit}
                sx={{ borderColor: 'primary.main' }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={handleDelete}
                sx={{ borderColor: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : (
            <>
              <Button
                fullWidth
                sx={{ backgroundColor: colors.Primary, color: '#fff' }}
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: course.title, // או שדה מזהה אמיתי אם יש (מומלץ שיהיה id אמיתי!)
                      name: course.title,
                      category:course.category,
                      price:course.price,
                      image: course.image || '',
                    })
                  )
                }
              >
                הוסף לסל
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ color: colors.Primary, borderColor: colors.Primary }}
                onClick={() => setOpenReviews(true)}
              >
                צפה בחוות דעת
              </Button>
            </>
          )}
        </Stack>

      </Card>

      {/*  דיאלוג חוות דעת */}
      <Dialog open={openReviews} onClose={() => setOpenReviews(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontFamily: fonts.heading,
            direction: 'rtl',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {course.title}
          <IconButton onClick={() => setOpenReviews(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
          {exampleReviews.map((review, index) => (
            <Box key={index} sx={{ mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold">{review.name}</Typography>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body2" sx={{ mt: 0.5 }}>{review.comment}</Typography>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
