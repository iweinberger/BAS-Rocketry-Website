import React from 'react';
import {
  Button,
  TextInput,
  DatePicker,
  Alert,
  Modal,
  FileInput,
  SearchInput,
} from '@/app/components';

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [textValue, setTextValue] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>BAS Rocketry</h1>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search..."
        />
      </header>

      <main className="app-main">
        <section className="app-section">
          <h2>Components Demo</h2>
          
          <div className="component-group">
            <h3>Buttons</h3>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>

          <div className="component-group">
            <h3>Inputs</h3>
            <TextInput
              label="Text Input"
              value={textValue}
              onChange={setTextValue}
              placeholder="Enter text..."
            />
            <TextInput
              label="Password Input"
              type="password"
              value=""
              onChange={() => {}}
              placeholder="Enter password..."
            />
          </div>

          <div className="component-group">
            <h3>Date Picker</h3>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Choose a date..."
            />
          </div>

          <div className="component-group">
            <h3>File Input</h3>
            <FileInput
              label="Upload Files"
              onChange={setFiles}
              accept=".pdf,.doc,.docx"
              multiple
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>
        </section>
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        size="medium"
      >
        <div className="modal-content">
          <p>This is an example modal with some content.</p>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </div>
      </Modal>

      <Alert
        type="info"
        title="Welcome!"
        message="This is an example of our UI components."
        duration={10000}
      />
    </div>
  );
}

export default App; 