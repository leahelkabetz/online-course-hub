
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
interface CourseCardProps {
  title: string;
  category: string;
  description: string;
  price: number;
  students: number;
  rating: number;
  badge?: string;
  image?: string;
  isAdmin?: boolean; // <=== חדש

}

const exampleReviews = [
  { name: 'שרה ל.', comment: 'קורס מצוין! למדתי המון', rating: 5 },
  { name: 'יעקב ש.', comment: 'מדריך ברור ומקצועי', rating: 4 },
];

export default function CourseCard({
  title,
  category,
  description,
  price,
  students,
  rating,
  badge,
  image,
  isAdmin
}: CourseCardProps) {
  const [openReviews, setOpenReviews] = useState(false);

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
        {badge && (
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
            {badge}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            variant="square"
            src={image}
            sx={{ width: 120, height: 120, backgroundColor: '#f3f3f3' }}
          />
        </Box>

        <Typography variant="subtitle2" fontWeight="bold" color={colors.TextGrPrimaryay}>
          {category}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.Black, my: 0.5 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: colors.TextGrPrimaryay, mb: 2 }}>
          {description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <StarIcon sx={{ fontSize: 18, color: '#ffb400' }} />
            <Typography variant="body2" color="text.secondary">
              {rating}
            </Typography>
          </Stack>

          <Typography variant="body2" fontWeight="bold" color={colors.Primary}>
            ₪{price}
          </Typography>
        </Stack>


        <Stack spacing={1}>
          {isAdmin ? (
            <Stack direction="row" spacing={1}>
  <IconButton
    color="primary"
    onClick={() => console.log('עריכה')}
    sx={{  borderColor: 'primary.main' }}
  >
    <EditIcon />
  </IconButton>

  <IconButton
    color="error"
    onClick={() => console.log('מחיקה')}
    sx={{  borderColor: 'error.main' }}
  >
    <DeleteIcon />
  </IconButton>
</Stack>
          ) : (
            <>
              <Button
                fullWidth
                sx={{ backgroundColor: colors.Primary, color: '#fff' }}
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

      {/* 🔽 דיאלוג חוות דעת */}
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
          {title}
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
