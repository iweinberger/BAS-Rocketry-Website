'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageGallery from '@/app/components/ImageGallery';
import { Project } from '@/app/data/projects';

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectGrid({ projects, className = '' }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [journalEntries, setJournalEntries] = useState<Array<{date: string, type: string, entry: string}>>([]);
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setShowJournal(false);
    setShowGallery(false);
    setJournalEntries([]);
  };

  const loadJournalData = async (journalFile: string) => {
    try {
      const response = await fetch(`/journals/${journalFile}`);
      const text = await response.text();
      const entries = text.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [date, type, entry] = line.split('|').map(part => part.trim());
          return { date, type, entry };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setJournalEntries(entries);
    } catch (error) {
      console.error('Failed to load journal data:', error);
      setJournalEntries([]);
    }
  };

  const getEntryTypeStyle = (type: string) => {
    const styles = {
      milestone: { color: '#2ecc71', borderColor: '#2ecc71', icon: 'flag' },
      update: { color: '#3498db', borderColor: '#3498db', icon: 'info-circle' },
      challenge: { color: '#e74c3c', borderColor: '#e74c3c', icon: 'exclamation-circle' },
      planning: { color: '#f1c40f', borderColor: '#f1c40f', icon: 'calendar' }
    };
    return styles[type as keyof typeof styles] || styles.update;
  };

  return (
    <div className={`project-grid ${className}`}>
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={`project-card ${project.comingSoon ? 'coming-soon' : ''}`}
        >
          {project.comingSoon ? (
            <div className="coming-soon-content">
              <div className="coming-soon-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="coming-soon-text">Coming Soon</div>
            </div>
          ) : (
            <>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className={`project-img ${loadedImages[`project-${index}`] ? 'loaded' : 'loading'}`}
                  onLoadingComplete={() => setLoadedImages(prev => ({ ...prev, [`project-${index}`]: true }))}
                  priority
                />
              </div>
              <p>{project.description}</p>
              <div className="project-title">{project.title}</div>
              <div className="project-eta">ETA: {project.eta}</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${project.progress}%` }}></div>
              </div>
              <div className="card-actions">
                {project.gallery && project.gallery.length > 0 && (
                  <button 
                    className="action-button gallery-button"
                    onClick={() => {
                      openProjectModal(index);
                      setShowGallery(true);
                    }}
                  >
                    <i className="fas fa-images"></i>
                    Gallery
                  </button>
                )}
                {project.journalFile && (
                  <button 
                    className="action-button journal-button"
                    onClick={() => {
                      openProjectModal(index);
                      loadJournalData(project.journalFile!);
                      setShowJournal(true);
                    }}
                  >
                    <i className="fas fa-book"></i>
                    Journal
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      {isModalOpen && selectedProject !== null && (
        <div className="project-modal" onClick={closeProjectModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProjectModal}>&times;</button>
            <h2>{projects[selectedProject].title}</h2>
            <p>{projects[selectedProject].description}</p>
            
            <div className="modal-actions">
              {projects[selectedProject].gallery && (
                <button 
                  className={`action-button gallery-button ${showGallery ? 'active' : ''}`}
                  onClick={() => setShowGallery(!showGallery)}
                >
                  <i className="fas fa-images"></i>
                  {showGallery ? 'Hide Gallery' : 'View Gallery'}
                </button>
              )}
              {projects[selectedProject].journalFile && (
                <button 
                  className={`action-button journal-button ${showJournal ? 'active' : ''}`}
                  onClick={() => {
                    if (!showJournal) {
                      loadJournalData(projects[selectedProject].journalFile!);
                    }
                    setShowJournal(!showJournal);
                  }}
                >
                  <i className={`fas ${showJournal ? 'fa-book-open' : 'fa-book'}`}></i>
                  {showJournal ? 'Hide Journal' : 'View Journal'}
                </button>
              )}
            </div>

            <div className="modal-progress">
              <h3>Development Progress</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${projects[selectedProject].progress}%` }}></div>
              </div>
              <span>{projects[selectedProject].progress}% Complete</span>
            </div>

            <div className="key-points">
              <h3>Key Points</h3>
              <ul>
                {projects[selectedProject].keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="eta">Estimated Completion: {projects[selectedProject].eta}</div>
            
            {showGallery && projects[selectedProject].gallery && (
              <div className="project-section project-gallery-section">
                <h3>Project Gallery</h3>
                <ImageGallery 
                  images={projects[selectedProject].gallery}
                  projectName={projects[selectedProject].title}
                />
              </div>
            )}
            
            {showJournal && (
              <div className="project-section project-journal-section">
                <h3>Development Journal</h3>
                <div className="journal-entries">
                  {journalEntries.length > 0 ? (
                    journalEntries.map((entry, idx) => {
                      const typeStyle = getEntryTypeStyle(entry.type);
                      return (
                        <div 
                          key={idx} 
                          className="journal-entry"
                          style={{ borderLeftColor: typeStyle.borderColor }}
                        >
                          <div 
                            className="journal-date"
                            style={{ color: typeStyle.color }}
                          >
                            <i className={`fas fa-${typeStyle.icon} entry-icon`} style={{ color: typeStyle.color }}></i>
                            {entry.date}
                            <span className="entry-type" style={{ 
                              color: typeStyle.color,
                              backgroundColor: `${typeStyle.color}20`,
                              borderColor: typeStyle.color
                            }}>
                              {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                            </span>
                          </div>
                          <div className="journal-content">{entry.entry}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-entries">No journal entries available.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
