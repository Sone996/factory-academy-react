import React, { useContext, useEffect, useState } from "react";
import { AppContext } from '../../AppContext';
import SimpleTable from "../../Components/Shared/SimpleTable";
import { personService } from "../../store/PersonModule/person.service";
import Scroll from "../../Components/Shared/Scroll";

const TeacherHome = () => {

  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const titles = ['Id', 'Name', 'Average Mark', 'Price'];
  const [model, setModel] = useState([]);

  const singleView = (item) => {
    console.log(item)
    // not finished
    // this.$router.push({ path: '/course', query: { id: item.id } })
  }

  const fetchMyCourses = async () => {
    personService.fetchMyCourses(loggedUser.id)
      .then(res => {
        //console.log(res.data)
        if (res.data.length > 0) {
          let myCourses = res.data;
          myCourses.forEach((course, i) => {
            myCourses[i] = {
              id: myCourses[i].id,
              name: myCourses[i].name,
              average_mark: myCourses[i].average_mark,
              price: myCourses[i].price
            }
          })
          setModel(res.data)
        }

      })
      .catch(err => {
        console.log(err)
      }
      );
  }

  useEffect(() => {
    if (loggedUser.id) {
      fetchMyCourses();
    }
  }, [loggedUser.id])

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="relative h-full w-3/4">
        <Scroll>
          <SimpleTable titles={titles} model={model} singleView={singleView}></SimpleTable>
        </Scroll>
      </div>
    </div>
  )
}

export default TeacherHome;