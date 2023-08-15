import useFetch from "../../Hooks/useFetch";
import ProtoListSchedules from "../../Pages/VerticalProto/ProtoListSchedules";

function ProtoView() {
  // eslint-disable-next-line
  const { data: schedules, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/`
  );

  return (
    <div className="proto-view">
      <h3> Take a peek at our database!</h3>
      <h4>Schedules</h4>

      {schedules && <ProtoListSchedules schedules={schedules} />}
    </div>
  );
}

export default ProtoView;
