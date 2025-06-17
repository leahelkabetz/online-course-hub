

import React, { useState } from 'react';
import {
  Card,
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
  TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import { deleteProduct, updateProduct } from '../api/coursesApi';
import { Course } from '../models/course';
import { colors, fonts } from '../styles/theme';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface CourseCardProps {
  course: Course;
  onDeleted: () => void;
  onEdited: () => void;
}

const exampleReviews = [
  { name: 'שרה ל.', comment: 'קורס מצוין! למדתי המון', rating: 5 },
  { name: 'יעקב ש.', comment: 'מדריך ברור ומקצועי', rating: 4 },
];

export default function CourseCard({ course, onDeleted, onEdited }: CourseCardProps) {
  const [openReviews, setOpenReviews] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState<Course>({ ...course });

  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedCourse({ ...course });
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      console.log('עדכון קורס:', course.id, editedCourse);

      const res = await updateProduct(course.id, editedCourse);
      console.log("קורס עודכן בהצלחה:", res.data);
      if (onEdited) onEdited();
      setIsEditing(false);
    } catch (error) {
      console.error("שגיאה בעדכון הקורס:", error);
    }
  };

  const handleDelete = async () => {
    console.log("🗑️ התחלת תהליך מחיקת הקורס");
    console.log("🧾 course.id לשליחה למחיקה:", course.id);

    try {
      console.log("👉 מנסה למחוק קורס עם מזהה:", course.id);

      await deleteProduct(course.id);

      console.log("✅ הקורס נמחק בהצלחה");

      if (onDeleted) {
        console.log("🔁 מפעיל onDeleted לעדכון תצוגה");
        onDeleted();
      } else {
        console.log("⚠️ onDeleted לא הועבר כרפרנס");
      }
    } catch (error) {
      console.error("❌ שגיאה במחיקת הקורס:", error);
    }
  };


  return (
    <>
      <Card
        sx={{
          position: 'relative', // חובה שיהיה
          p: 2,
          border: '1px solid #eee',
          borderRadius: 3,
          fontFamily: fonts.base,
          direction: 'rtl',
          height: '100%',
          overflow: 'hidden', // מונע חריגה
        }}
      >
        {/* תווית פופולרי */}
        {course.badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: colors.AccentLight,
              color: '#fff',
              fontSize: 12,
              borderRadius: 8,
              px: 1.5,
              py: 0.5,
              maxWidth: '80%', // מונע חיתוך בתצוגות צרות
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {course.badge}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            variant="square"
            src={editedCourse.image}
            sx={{ width: 120, height: 120, backgroundColor: '#f3f3f3' }}
          />
        </Box>
        {isEditing && (
          <FormControl
            fullWidth
            size="small"
            sx={{
              mb: 2,
              direction: 'rtl',
              '& .MuiOutlinedInput-root': {
                direction: 'rtl',
              },
              '& .MuiOutlinedInput-notchedOutline legend': {
                textAlign: 'right',
                direction: 'rtl',
              },
            }}
          >
            <InputLabel
              id="badge-label"
              shrink // ✅ הנה זה במקום הנכון
              sx={{
                right: 30,
                left: 'auto',
                transformOrigin: 'top right',
              }}
            >
              תגית
            </InputLabel>

            <Select
              labelId="badge-label"
              id="badge"
              value={editedCourse.badge || ''}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, badge: e.target.value })
              }
              label="תגית"
              displayEmpty
              inputProps={{
                dir: 'rtl',
                style: { textAlign: 'right' },
              }}
              sx={{
                '& .MuiSelect-select': {
                  textAlign: 'right',
                },
              }}
            >
              <MenuItem value="">
                <em>ללא תגית</em>
              </MenuItem>
              <MenuItem value="פופולרי">פופולרי</MenuItem>
              <MenuItem value="מומלץ">מומלץ</MenuItem>
              <MenuItem value="חדש">חדש</MenuItem>
            </Select>
          </FormControl>

        )}

        {isEditing && (
          <TextField
            label="כתובת תמונה (URL)"
            value={editedCourse.image}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, image: e.target.value })
            }
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              mb: 2,
              '& label': {
                right: 26,
                left: 'auto',
                transformOrigin: 'top right',
              },
              '& legend': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-root': {
                direction: 'ltr',
              },
            }}
            InputLabelProps={{
              sx: {
                right: 4,
                left: 'auto',
                transformOrigin: 'top right',
              },
            }}
          />
        )}

        {isEditing ? (
          <TextField
            label="קטגוריה"
            value={editedCourse.category}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, category: e.target.value })
            }
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              direction: 'rtl',
              mb: 2,
              '& label': {
                right: 27,
                left: 'auto',
                transformOrigin: 'top right',
              },
              '& legend': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-root': {
                direction: 'ltr',
              },
            }}
            InputLabelProps={{
              sx: {
                right: 4,
                left: 'auto',
                transformOrigin: 'top right',
              },
            }} />
        ) : (
          <Typography variant="subtitle2" fontWeight="bold" color={colors.TextGrPrimaryay}>
            {editedCourse.category}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            label="כותרת"
            value={editedCourse.title}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, title: e.target.value })
            }
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              mb: 2,
              '& label': {
                right: 27,
                left: 'auto',
                transformOrigin: 'top right',
              },
              '& legend': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-root': {
                direction: 'ltr',
              },
            }}
            InputLabelProps={{
              sx: {
                right: 4,
                left: 'auto',
                transformOrigin: 'top right',
              },
            }} />
        ) : (
          <Typography variant="h6" fontWeight="bold" sx={{ color: colors.Black, my: 0.5 }}>
            {editedCourse.title}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            label="תיאור"
            value={editedCourse.description}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, description: e.target.value })
            }
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              mb: 2,
              '& label': {
                right: 27,
                left: 'auto',
                transformOrigin: 'top right',
              },
              '& legend': {
                textAlign: 'right',
              },
              '& .MuiOutlinedInput-root': {
                direction: 'ltr',
              },
            }}
            InputLabelProps={{
              sx: {
                right: 4,
                left: 'auto',
                transformOrigin: 'top right',
              },
            }} />
        ) : (
          <Typography variant="body2" sx={{ color: colors.TextGrPrimaryay, mb: 2 }}>
            {editedCourse.description}
          </Typography>
        )}

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <StarIcon sx={{ fontSize: 18, color: '#ffb400' }} />
            <Typography variant="body2" color="text.secondary">
              {editedCourse.rating}
            </Typography>
          </Stack>

          {isEditing ? (
            <TextField
              label="מחיר"
              value={editedCourse.price}
              type="number"
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, price: Number(e.target.value) })
              }
              variant="outlined"
              size="small"
              sx={{
                width: 100,
                direction: 'rtl',
                '& .MuiInputLabel-root': {
                  right: 30,
                  // left: 'auto',
                  transformOrigin: 'top right',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  direction: 'rtl',
                },
                '& .MuiOutlinedInput-notchedOutline legend': {
                  width: '32px',
                  marginLeft: 6 // 👈 את יכולה להקטין או להגדיל – זה האורך של החריץ
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <Typography variant="body2" fontWeight="bold" color={colors.Primary}>
              ₪{editedCourse.price}
            </Typography>
          )}
        </Stack>

        <Stack spacing={1}>
          {isAdmin ? (
            isEditing ? (
              <Stack direction="row" spacing={1}>
                <Button color="primary" onClick={handleSaveEdit} sx={{ fontSize: '0.8rem' }}>
                  שמור
                </Button>
                <Button color="inherit" onClick={handleCancelEdit} sx={{ fontSize: '0.8rem' }}>
                  בטל
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )
          ) : (
            <>
              <Button
                fullWidth
                sx={{ backgroundColor: colors.Primary, color: '#fff' }}
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: course.title,
                      name: course.title,
                      category: course.category,
                      price: course.price,
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
          {editedCourse.title}
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
