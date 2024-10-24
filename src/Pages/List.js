<List>
                      {VideosArray
                        .sort((a, b) => a.videos.localeCompare(b.videos)) // Sort by the video title (or any other stable field)
                        .map((sectionId) => (
                          <div
                            key={sectionId.id} // Use sectionId.id as the unique key
                            style={{
                              marginBottom: '15px',
                              padding: '3px',
                              borderRadius: '8px',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                          >
                    <ListItem
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        padding: '5px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center', // Align items vertically
                      }}
                    >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                      }}
                    >
                        <OndemandVideoIcon
                          sx={{
                            color: sectionId.id === activeIndex ? '#008000' : '#fed008',
                            fontSize: 32,
                          }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${sectionId.videos}`}
                      primaryTypographyProps={{ fontWeight: 500, fontSize: '1rem' }}
                      secondary={
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          mt: 1,
                          p: 0.5,
                          borderRadius: 2,
                          backgroundColor: '#f5f8fa',
                          boxShadow: 1,
                          width: '100%', // Take full width
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <VisibilityIcon sx={{ color: '#007BFF', fontSize: 18, mr: 0.25 }} />
                          <Typography variant="caption" component="span" fontWeight="bold" color="#333" sx={{ mr: 0.25 }}>
                            Views:
                          </Typography>
                          <Typography variant="caption" component="span" sx={{ color: '#555' }}>
                            {sectionId.count || "N/A"}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <AccessTimeIcon sx={{ color: '#28A745', fontSize: 18, mr: 0.25 }} />
                          <Typography variant="caption" component="span" fontWeight="bold" color="#333" sx={{ mr: 0.25 }}>
                            Duration:
                          </Typography>
                          <Typography variant="caption" component="span" sx={{ color: '#555' }}>
                            {sectionId.duration || "N/A"}
                          </Typography>
                        </Box>
                            <IconButton
                              onClick={async (event) => {
                                event.stopPropagation(); // Prevent the ListItem from also triggering
                                if (activeIndex !== sectionId.id) {
                                  if (sectionId.count >= parseInt(sectionId.videowatchlimit)) {
                                    setopenError(true);
                                    return;
                                  }

                                  await DecryptVideoAndPlay(sectionId, sectionId.id);
                                  setactiveIndex(sectionId.id);
                                  setIsLocked(false);
                                }
                              }}
                              sx={{
                                backgroundColor: '#008CBA',
                                color: '#fff',
                                '&:hover': {
                                  backgroundColor: '#005f73',
                                },
                              }}
                            >
                           <PlayArrowIcon />
                                </IconButton>
                              </Box>
                            }
                          />
                        </ListItem>
                      </div>
                    ))}
                </List>