import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Form, Input, Modal, notification, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import '../../styles/components/UpdateComponents.css';

const { Option } = Select;

function UpdateProject({ id, onUpdateSuccess }) {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const [project, setProject] = useState(null);
  const [organisations, setOrganisations] = useState([]);
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const [projectResponse, organisationsResponse, sousOrganisationsResponse, chefProjectsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/projects/${id}`),
          axios.get('http://localhost:5000/organisations'),
          axios.get('http://localhost:5000/sous-organisations'),
          axios.get('http://localhost:5000/chef-projects'),
        ]);

        setProject(projectResponse.data);
        setOrganisations(organisationsResponse.data);
        setSousOrganisations(sousOrganisationsResponse.data);
        setChefProjects(chefProjectsResponse.data);

        // Set form fields with project data
        form.setFieldsValue({
          ...projectResponse.data,
          startDate: projectResponse.data.startDate ? dayjs(projectResponse.data.startDate) : null,
          endDate: projectResponse.data.endDate ? dayjs(projectResponse.data.endDate) : null,
        });
        // Open modal when project data is fetched
        setVisible(true);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      values.startDate = values.startDate ? values.startDate.toISOString().split('T')[0] : null;
      values.endDate = values.endDate ? values.endDate.toISOString().split('T')[0] : null;

      await axios.put(`http://localhost:5000/projects/${id}`, values);
      notification.success({
        message: 'Success',
        description: 'Project updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); // Notify parent component of success
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update project',
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button className="update-button" onClick={() => setVisible(true)}>
  Update
</Button>

<Modal
  className="update-modal"
  title="Update Task"
  visible={visible}
  onOk={handleOk}
  onCancel={handleCancel}
>

        {project && (
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Project Name" rules={[{ required: true, message: 'Please enter the project name.' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="startDate" label="Start Date">
              <DatePicker
                format="YYYY-MM-DD"
                value={form.getFieldValue('startDate') ? dayjs(form.getFieldValue('startDate')) : null}
                onChange={(date) => form.setFieldsValue({ startDate: date })}
              />
            </Form.Item>
            <Form.Item name="endDate" label="End Date">
              <DatePicker
                format="YYYY-MM-DD"
                value={form.getFieldValue('endDate') ? dayjs(form.getFieldValue('endDate')) : null}
                onChange={(date) => form.setFieldsValue({ endDate: date })}
              />
            </Form.Item>
            <Form.Item name="budget" label="Budget" rules={[{ required: true, message: 'Please enter the budget.' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="organisation" label="Organisation" rules={[{ required: true, message: 'Please select an organisation.' }]}>
              <Select placeholder="Select an organisation">
                {organisations.map(org => (
                  <Option key={org._id} value={org._id}>{org.nom}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="sousOrganisation" label="Sous-Organisation">
              <Select placeholder="Select a sous-organisation">
                {sousOrganisations.map(sousOrg => (
                  <Option key={sousOrg._id} value={sousOrg._id}>{sousOrg.nom}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="chefProject" label="Chef Project">
              <Select placeholder="Select a chef project">
                {chefProjects.map(chef => (
                  <Option key={chef._id} value={chef._id}>{`${chef.nom} ${chef.prenom}`}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default UpdateProject;
