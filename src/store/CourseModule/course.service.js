import { courseRepo } from "./course.repo";
import omit from "lodash/omit";

class CourseService {
    // studentsOnCourse(data) {
    //     return courseRepo.studentsOnCourse(data);
    // }

    // buyCourse(data) {
    //     return courseRepo.buyCourse({
    //         id: data.id,
    //         data: omit(data, ['id'])
    //     });
    // }

    createCourse(data) {
        return courseRepo.createCourse(data);
    }
    
    // fetchSingleCours(data) {
    //     return courseRepo.fetchSingleCours(data);
    // }

    fetchAllCourses() {
        return courseRepo.fetchAllCourses();
    }

    // // fetchMyCourses(id) {
    // //     return adminRepo.fetchMyCourses(id);
    // // }

    // completeCourse(data) {
    //     return courseRepo.completeCourse({
    //         courseId: data.courseId,
    //         teacherId: data.teacherId,
    //         userId: data.userId,
    //         data: omit(data, ['courseId', 'teacherId', 'userId'])
    //     });
    // }
}

export const courseService = new CourseService();