import mongoose from "mongoose";

const studentCollection = "student";

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  courses: {
    type: [{ course: { type: mongoose.Schema.Types.ObjectId, ref: "course" } }],
  },
});
// Middleware de mongoose
// Este middleware nos permite hacer operaciones previo a mostrar el resultado
studentSchema.pre("find", function(){
  // La palabra this haces referencia a este documento, es por eso que la apalabra populate aparece y funciona
   this.populate("courses.course");
})

export const studentModel = mongoose.model(studentCollection, studentSchema);
