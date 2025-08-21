// import { useState, useEffect } from "react";
// import { Form, Button, Card, Row, Col } from "react-bootstrap";

// const LoadForm = ({ initialData, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     vin: "",
//     transportType: "Cars", // Новое поле для типа транспорта
//     sender: { name: "", address: "", contact: "", email: "" }, // Добавлено email
//     receiver: { name: "", address: "", contact: "", email: "" }, // Добавлено email
//     weight: "",
//     dimensions: { length: "", width: "", height: "" }, // Новое поле для габаритов
//     value: "", // Стоимость груза
//     insurance: false, // Страховка
//     specialRequirements: "", // Особые требования
//     description: "",
//     status: "in process",
//     pickupDate: "",
//     deliveryDate: ""
//   });

//   const transportTypes = ["Boats", "Cars", "Motorcycles", "RVs"];

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         ...initialData,
//         pickupDate: initialData.pickupDate?.split('T')[0] || "",
//         deliveryDate: initialData.deliveryDate?.split('T')[0] || "",
//         // Инициализация новых полей
//         dimensions: initialData.dimensions || { length: "", width: "", height: "" },
//         transportType: initialData.transportType || "Cars",
//         insurance: initialData.insurance || false,
//         value: initialData.value || "",
//         specialRequirements: initialData.specialRequirements || ""
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.startsWith("sender.") || name.startsWith("receiver.") || name.startsWith("dimensions.")) {
//       const [field, subfield] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [field]: {
//           ...prev[field],
//           [subfield]: value
//         }
//       }));
//     } else if (type === "checkbox") {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Card className="p-4 mb-4">
//       <h4>{initialData ? "Edit Load" : "Add New Load"}</h4>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>VIN *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="vin"
//                 value={formData.vin}
//                 onChange={handleChange}
//                 required
//                 disabled={!!initialData}
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Transport Type *</Form.Label>
//               <Form.Select
//                 name="transportType"
//                 value={formData.transportType}
//                 onChange={handleChange}
//                 required
//               >
//                 {transportTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
          
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="in process">in process</option>
//                 <option value="picked up">In Transit</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <h5 className="mt-4 border-bottom pb-2">Sender Information</h5>
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="sender.name"
//                 value={formData.sender.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Contact *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="sender.contact"
//                 value={formData.sender.contact}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
        
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="sender.email"
//                 value={formData.sender.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Address *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="sender.address"
//                 value={formData.sender.address}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <h5 className="mt-4 border-bottom pb-2">Receiver Information</h5>
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="receiver.name"
//                 value={formData.receiver.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Contact *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="receiver.contact"
//                 value={formData.receiver.contact}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
        
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="receiver.email"
//                 value={formData.receiver.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Address *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="receiver.address"
//                 value={formData.receiver.address}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <h5 className="mt-4 border-bottom pb-2">Load Details</h5>
//         <Row>
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Weight (kg) *</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 required
//                 min="1"
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Value ($)</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="value"
//                 value={formData.value}
//                 onChange={handleChange}
//                 min="0"
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Insurance</Form.Label>
//               <div className="mt-2">
//                 <Form.Check
//                   type="switch"
//                   id="insurance-switch"
//                   label="Insured"
//                   name="insurance"
//                   checked={formData.insurance}
//                   onChange={handleChange}
//                 />
//               </div>
//             </Form.Group>
//           </Col>
          
//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Dimensions (m)</Form.Label>
//               <div className="d-flex gap-1">
//                 <Form.Control
//                   placeholder="L"
//                   name="dimensions.length"
//                   value={formData.dimensions.length}
//                   onChange={handleChange}
//                 />
//                 <Form.Control
//                   placeholder="W"
//                   name="dimensions.width"
//                   value={formData.dimensions.width}
//                   onChange={handleChange}
//                 />
//                 <Form.Control
//                   placeholder="H"
//                   name="dimensions.height"
//                   value={formData.dimensions.height}
//                   onChange={handleChange}
//                 />
//               </div>
//             </Form.Group>
//           </Col>
//         </Row>
        
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Pickup Date *</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="pickupDate"
//                 value={formData.pickupDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
          
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Delivery Date *</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="deliveryDate"
//                 value={formData.deliveryDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
        
//         <Form.Group className="mb-3">
//           <Form.Label>Special Requirements</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={2}
//             name="specialRequirements"
//             value={formData.specialRequirements}
//             onChange={handleChange}
//             placeholder="Special handling, temperature control, etc."
//           />
//         </Form.Group>
        
//         <Form.Group className="mb-3">
//           <Form.Label>Description *</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             placeholder="Detailed description of the load"
//           />
//         </Form.Group>

//         <div className="d-flex justify-content-end gap-2">
//           <Button variant="secondary" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             {initialData ? "Update Load" : "Create Load"}
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default LoadForm;