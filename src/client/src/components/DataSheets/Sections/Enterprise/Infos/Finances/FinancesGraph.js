import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import { setYearMonthFormat } from "../../../../../../helpers/Date";
import {
  formatChiffre,
  sortedApiDataAsc,
  sortedDataAsc,
} from "../../../../../../utils/donnees-ecofi/donnees-ecofi";

function FinancesGraph({ data = [], isDataApi = false }) {
  const chartCanvasRef = useRef(null);
  const [datasetsToDisplay, setDatasetsToDisplay] = useState([
    "Chiffre d'affaires ",
  ]);

  useEffect(() => {
    updateChart();
  }, [datasetsToDisplay]); // Update the chart whenever datasetsToDisplay changes

  const handleCheckboxChange = (event) => {
    const dataset = event.target.value;

    if (event.target.checked) {
      // Add dataset to the list of datasets to display
      setDatasetsToDisplay((prevDatasets) => [...prevDatasets, dataset]);
    } else {
      // Remove dataset from the list of datasets to display
      setDatasetsToDisplay((prevDatasets) =>
        prevDatasets.filter((item) => item !== dataset)
      );
    }
  };

  const updateChart = () => {
    const chart = chartCanvasRef?.current;

    // Hide all datasets
    chart?.data?.datasets.forEach((dataset) => {
      dataset.hidden = true;
    });

    // Show the selected datasets
    datasetsToDisplay.forEach((dataset) => {
      const datasetIndex = chart?.data?.datasets?.findIndex(
        (d) => d.label === dataset
      );

      if (datasetIndex !== -1) {
        chart.data.datasets[datasetIndex].hidden = false;
      }
    });

    chart.update();
  };
  const datasets = isDataApi
    ? [
        {
          backgroundColor: "#FCF3CF",
          borderColor: "#F4D03F",
          label: "Chiffre d'affaires ",
        },
      ]
    : [
        {
          backgroundColor: "#85C1E9",
          borderColor: "#3498DB",
          label: "EBE ",
        },
        {
          backgroundColor: "#FCF3CF",
          borderColor: "#F4D03F",
          label: "Chiffre d'affaires ",
        },
        {
          backgroundColor: "#ABEBC6",
          borderColor: "#2ECC71",
          borderWidth: 2.5,
          label: "Résultat d'exploitation ",
        },
        {
          backgroundColor: "#F1948A",
          borderColor: "#B71C1C",
          borderWidth: 2.5,
          label: "Résultat net ",
        },
        {
          backgroundColor: "#BB8FCE",
          borderColor: "#5B2C6F",
          borderWidth: 2.5,
          label: "Marge brute ",
        },
      ];
  const chartData = isDataApi
    ? {
        datasets: [
          {
            backgroundColor: "#FCF3CF",
            borderColor: "#F4D03F",
            borderWidth: 2.5,
            data: sortedApiDataAsc(data)?.map(({ data }) => data?.ca),
            label: "Chiffre d'affaires ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
        ],
        labels: sortedApiDataAsc(data)?.map(({ data }) =>
          setYearMonthFormat(data?.date_fin_exercice)
        ),
      }
    : {
        datasets: [
          {
            backgroundColor: "#85C1E9",
            borderColor: "#3498DB",
            borderWidth: 2.5,
            data: sortedDataAsc(data)?.map(({ EBE }) => EBE),
            fill: false,
            label: "EBE ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
          {
            backgroundColor: "#FCF3CF",
            borderColor: "#F4D03F",
            borderWidth: 2.5,
            data: sortedDataAsc(data)?.map(({ ca }) => ca),
            label: "Chiffre d'affaires ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
          {
            backgroundColor: "#ABEBC6",
            borderColor: "#2ECC71",
            borderWidth: 2.5,
            data: sortedDataAsc(data)?.map(({ EBIT }) => EBIT),
            label: "Résultat d'exploitation ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
          {
            backgroundColor: "#F1948A",
            borderColor: "#B71C1C",
            borderWidth: 2.5,
            data: sortedDataAsc(data)?.map(({ Resultat_net }) => Resultat_net),
            label: "Résultat net ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
          {
            backgroundColor: "#BB8FCE",
            borderColor: "#5B2C6F",
            borderWidth: 2.5,
            data: sortedDataAsc(data)?.map(({ Marge_brute }) => Marge_brute),
            label: "Marge brute ",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            tension: 0.3,
          },
        ],
        labels: sortedDataAsc(data)?.map(({ date_fin_exercice }) =>
          setYearMonthFormat(date_fin_exercice)
        ),
      };
  const options = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Données financières",
      },
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            const label = tooltipItem.dataset.label || "";
            return (
              label +
              "(€) :" +
              " " +
              formatChiffre(tooltipItem.parsed.y.toString()).toString()
            );
          },
          labelColor: function (tooltipItem) {
            return {
              backgroundColor: tooltipItem.dataset.backgroundColor,
              borderRadius: 2,
              borderWidth: 2,
            };
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        border: { display: true },
      },

      y: {
        ticks: {
          callback: (label) => {
            return formatChiffre(label.toString()) + "(€)";
          },
        },
      },
    },
  };

  return (
    <div>
      {data?.length > 0 && (
        <div className={isDataApi ? "chart-wrapper" : "finance-chart-wrapper"}>
          {!isDataApi && (
            <div className="chart-legend">
              {datasets.map(({ label, borderColor }) => (
                <div key={label}>
                  <input
                    type="checkbox"
                    value={label}
                    className="dataset-checkbox"
                    checked={datasetsToDisplay.includes(label)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{label}</label>
                  <span style={{ "--border-color": borderColor }} />
                </div>
              ))}
            </div>
          )}
          <div>
            <Line
              ref={chartCanvasRef}
              id="chart"
              options={options}
              data={chartData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

FinancesGraph.propTypes = {
  data: PropTypes.array,
  isDataApi: PropTypes.bool,
};

export default FinancesGraph;
