import { personRepo } from "./person.repo";
import omit from "lodash/omit";

class PersonService {
    fetchMyCourses(data) {
        return personRepo.fetchMyCourses(data);
    }

    goProfile(id) {
        return personRepo.goProfile(id);
    }

    // fetchNotCompletedCourses() {
    //     return personRepo.fetchNotCompletedCourses();
    // }

    // fetchCompletedCourses(id) {
    //     return personRepo.fetchCompletedCourses(id);
    // }

    fetchMyStudents() {
        return personRepo.fetchMyStudents();
    }

    fetchAplicationRequests() {
        return personRepo.fetchAplicationRequests();
    }

    // resolveRequest(data) {
    //     return personRepo.resolveRequest({
    //         courseId: data.course_id,
    //         data: omit(data, ['course_id']) 
    //     });
    // }

    // fetchNotRatedCourses(data) {
    //     return personRepo.fetchNotRatedCourses(data);
    // }

    // completeCourse(data) {
    //     return personRepo.completeCourse({
    //         personId: data.personId,
    //         data: omit(data, ['personId'])
    //     });
    // }
}

export const personService = new PersonService();