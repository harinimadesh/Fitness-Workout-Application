import React, { useEffect, useState } from "react";
import axios from "axios";
import DietPieChart from "../../components/DietPieChart";
import { Card } from "../../components/UI";

function DietPlanPage({ auth }) {
  const [dietPlans, setDietPlans] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;
    axios.get(`http://localhost:8080/api/diets/user/${auth.id}`)
      .then(res => setDietPlans(res.data))
      .catch(err => console.error("Error fetching diet plans:", err));
  }, [auth.id]);

  return (
    <div className="container">
      <h2>My Diet Plan</h2>

      <div className="row" style={{ marginTop: 20 }}>
        <div className="col">
          <Card title="Diet Plan List">
            <div className="list">
              {dietPlans.map(d => (
                <div className="list-item" key={d.id}>
                  <div><strong>{d.mealType}</strong> — {d.foodItem}</div>
                  <div>{d.calories} kcal</div>
                </div>
              ))}
              {!dietPlans.length && <div style={{ padding: 12 }}>No diet plans assigned.</div>}
            </div>
          </Card>
        </div>

        <div className="col">
          <Card title="Calorie Breakdown">
            <DietPieChart userId={auth.id} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DietPlanPage;