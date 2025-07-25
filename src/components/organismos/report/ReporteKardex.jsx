import styled from "styled-components";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Inconsolata",
  src: "http://fonts.gstatic.com/s/inconsolata/v15/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: { flexDirection: "row" },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  table: { width: "100%", margin: "auto", marginTop: 10 },
  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderBottomColor: "#121212",
    alignItems: "stretch",
    height: 24,
    borderLeftColor: "#000",
    borderLeft: 1,
    textAlign: "left",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "left",
    borderLeftColor: "#000",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export function ReporteKardex({ data }) {
  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.fecha}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.detalle}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.cantidad}
      </Text>
    </View>
  );
  const renderPage = (pageNumber, pageCount) => (
    <Text style={{ position: "absolute", top: 16, right: 16 }}>
      Página {pageNumber} de {pageCount}
    </Text>
  );
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  return (
    <Document title="Reporte de movimientos">
      <Page size="A4" orientation="landscape">
        <View style={styles.page}>
          <View style={styles.section}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "ultrabold",
                marginBottom: 10,
              }}
            >
              Movimientos de Inventario
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Fecha y Hora de Impresión: {formattedDate}
            </Text>
            <View style={styles.table}>
              {renderTableRow(
                {
                  fecha: "Fecha",
                  descripcion: "Producto",
                  detalle: "Movimiento",
                  cantidad: "Cantidad",
                },
                true
              )}
              {data?.map((movement) => renderTableRow(movement))}
            </View>
          </View>
        </View>
        {renderPage}
      </Page>
    </Document>
  );
}

const Container = styled.div``;
